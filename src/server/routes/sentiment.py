from fastapi import APIRouter, HTTPException
from ..models.customer_reviews_sentiment import predict_sentiment, extract_key_phrases

router = APIRouter()


@router.post("/sentiment-analysis")
async def analyze_sentiments(reviews: list[str]):
    """
    Analyze sentiment and extract adjectives from reviews.
    """
    try:
        # Predict sentiment
        sentiments = [predict_sentiment(review) for review in reviews]

        # Sentiment breakdown
        sentiment_breakdown = {
            "positive": len([s for s in sentiments if s in [4, 5]]),
            "neutral": len([s for s in sentiments if s == 3]),
            "negative": len([s for s in sentiments if s in [1, 2]]),
        }

        # Extract adjectives
        key_phrases = extract_key_phrases(reviews)

        return {
            "breakdown": sentiment_breakdown,
            "key_phrases": key_phrases,
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing reviews: {str(e)}")
