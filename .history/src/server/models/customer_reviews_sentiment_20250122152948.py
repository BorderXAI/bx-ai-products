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


def extract_key_phrases_and_themes(reviews):
    """
    Use OpenAI LLM to extract key phrases and recurring themes from reviews.

    Args:
        reviews (list of str): List of review texts.

    Returns:
        dict: Dictionary containing key phrases/themes.
    """
    try:
        # Construct the prompt
        prompt = (
            "You are a helpful assistant tasked with analyzing customer reviews. "
            "Your goal is to extract recurring themes/common feedback. "
            "Provide key phrases and themes in the following format:\n\n"
            "Key Phrases:\n- <Phrase 1>\n- <Phrase 2>\n...\n\n"
            "Themes:\n- <Theme 1>: Description\n- <Theme 2>: Description\n\n"
            "Reviews:\n"
        )
        prompt += "\n".join(f"- {review}" for review in reviews)

        # Send the request to OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
        )

        # Extract and parse response content
        content = response.choices[0].message.content
        return content

    except Exception as e:
        print(f"Error while extracting key phrases and themes: {e}")
        return {}
