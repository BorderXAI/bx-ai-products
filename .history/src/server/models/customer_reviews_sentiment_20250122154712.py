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
# Configure logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

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


def extract_key_phrases(reviews):
    """
    Use OpenAI LLM to extract positive and negative key phrases from reviews in JSON format.

    Args:
        reviews (list of str): List of review texts.

    Returns:
        dict: Dictionary containing categorized key phrases.
    """
    try:
        # Construct the prompt
        prompt = (
            "You are a helpful assistant tasked with analyzing customer reviews. "
            "Your goal is to extract frequently recurring key phrases, categorized as positive or negative. "
            "Key phrases should be concise, ideally 1 to 3 words, such as 'very stable', 'adjustable height', 'good quality'. "
            "Provide the output as a JSON object in the following format:\n\n"
            "Example:\n"
            "{\n"
            "  \"positive\": [\"Good support\", \"Very chic\", \"Super comfortable\"],\n"
            "  \"negative\": [\"Not worth\", \"Hole forming\", \"Cheap foam\"]\n"
            "}\n\n"
            "Reviews:\n"
        )
        prompt += "\n".join(f"- {review}" for review in reviews)

        # Send the request to OpenAI
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
        )

        # Extract and log response content
        content = response.choices[0].message.content
        logger.debug(f"Extracted content from OpenAI: {content}")

        # Convert the response to a dictionary (assuming it's valid JSON)
        result = eval(content)  # Use `json.loads(content)` if content is a valid JSON string
        return result

    except Exception as e:
        logger.error(f"Error while extracting key phrases: {e}")
        return {}

