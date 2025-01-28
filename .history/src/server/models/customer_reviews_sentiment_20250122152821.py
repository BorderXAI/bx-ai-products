from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from collections import Counter
from pydantic import BaseModel
from typing import List
from openai import OpenAI
import logging
from dotenv import load_dotenv
import os

# Download nltk resources if not already done
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')

# Load the fine-tuned model tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("LiYuan/amazon-review-sentiment-analysis")
model = AutoModelForSequenceClassification.from_pretrained("LiYuan/amazon-review-sentiment-analysis")


# Function to predict sentiment
def predict_sentiment(review_text):
    inputs = tokenizer(review_text, return_tensors="pt")
    outputs = model(**inputs)
    predicted_class = torch.argmax(outputs.logits, dim=1).item() + 1  # Adding 1 to match the 1-5 scale
    return predicted_class


def extract_adjectives(reviews):
    """
    Extract adjectives from a list of reviews.

    Args:
        reviews (list of str): List of review texts.

    Returns:
        list: Top 5 most common adjectives.
    """
    stop_words = set(stopwords.words('english'))
    adjectives = []

    for review in reviews:
        # Tokenize and POS tag
        words = word_tokenize(review.lower())
        pos_tags = pos_tag(words)

        # Filter adjectives and remove stopwords
        filtered_adjectives = [
            word for word, tag in pos_tags
            if tag.startswith('JJ') and word not in stop_words and word.isalnum()
        ]
        adjectives.extend(filtered_adjectives)

    # Count most common adjectives
    most_common = Counter(adjectives).most_common(5)
    return [word for word, count in most_common]


# Load environment variables from .env file
load_dotenv()
openai_key = os.getenv("OPENAI_API_KEY")

# Initialize the OpenAI client
client = OpenAI(api_key=openai_key)

# Configure logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

router = APIRouter()


# Request model for the API
class ReviewSummarizationRequest(BaseModel):
    reviews: List[dict]  # Each review will have text and a rating field


# Response model for the API
class ReviewSummarizationResponse(BaseModel):
    summary: str
    pain_points: List[str]


@router.post("/summarize-reviews", response_model=ReviewSummarizationResponse)
async def summarize_reviews(request: ReviewSummarizationRequest):
    """
    Summarize low-rated reviews using OpenAI's API.
    """
    try:
        logger.info("Received summarize-reviews request.")
        logger.debug(f"Request data: {request}")

        # Filter reviews with rating <= 3
        low_rated_reviews = [
            review["review"] for review in request.reviews if int(float(review["rating"])) <= 3
        ]

        logger.debug(f"Filtered low-rated reviews: {low_rated_reviews}")

        if not low_rated_reviews:
            logger.warning("No low-rated reviews found.")
            raise HTTPException(
                status_code=400,
                detail="No reviews with a rating of 3 or less were found.",
            )

        # Prepare the prompt with examples for OpenAI
        prompt = (
            "You are a helpful assistant tasked with analyzing low-rated product reviews. "
            "Your goal is to identify key pain points and areas of dissatisfaction mentioned in the reviews. "
            "Follow the format below:\n\n"
            "Example:\n"
            "Reviews:\n"
            "- The product stopped working after a week. Customer service was unresponsive.\n"
            "- The quality is poor and does not match the description.\n"
            "- It takes too long to charge and the battery drains quickly.\n\n"
            "Summary: Customers frequently complained about the product's durability, poor quality, and battery issues.\n\n"
            "Pain Points:\n"
            "- Product stopped working quickly\n"
            "- Poor customer service\n"
            "- Low-quality materials\n"
            "- Long charging time and poor battery life\n\n"
            "Now, analyze the following reviews and return the summary and pain points:\n"
        )
        prompt += "\n".join(f"- {review}" for review in low_rated_reviews)
        logger.debug(f"Generated prompt for OpenAI: {prompt}")

        # Call OpenAI's API using the new format
        # Call OpenAI's API using the new format
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ]
        )

        logger.info("Received response from OpenAI.")
        logger.debug(f"OpenAI response: {response}")

        # Extract the content from the response
        content = response.choices[0].message.content
        logger.debug(f"Response content: {content}")

        # Separate the summary and pain points
        lines = content.split("\n")
        summary = None
        pain_points = []

        for line in lines:
            if line.startswith("Summary:"):
                summary = line.replace("Summary:", "").strip()
            elif line.startswith("- "):
                pain_points.append(line.strip())

        if not summary:
            logger.error("Failed to parse summary from OpenAI response.")
            raise HTTPException(
                status_code=500, detail="Failed to parse summary from OpenAI response."
            )

        logger.info("Successfully parsed summary and pain points.")
        return {"summary": summary, "pain_points": pain_points}
    except Exception as e:
        logger.exception("Error processing summarize-reviews request.")
        raise HTTPException(status_code=500, detail=f"Error with OpenAI API: {str(e)}")
