from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk import pos_tag

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
        list: Top 10 most common adjectives.
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
    most_common = Counter(adjectives).most_common(10)
    return [word for word, count in most_common]

# Example usage
# review = "The product quality is poor!"
# predicted_rating = predict_sentiment(review)
# print(f"Predicted Rating: {predicted_rating} stars")