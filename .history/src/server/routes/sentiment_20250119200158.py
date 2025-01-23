from fastapi import APIRouter, HTTPException
from ..models.customer_reviews_sentiment import predict_sentiment

router = APIRouter()


@router.post("/api/sentiment-analysis")
async def analyze_sentiments(reviews: list[str]):
    """
    Analyze the sentiment of a list of reviews.

    Args:
        reviews (list): List of customer reviews.

    Returns:
        dict: Sentiment analysis results with counts and predicted scores.
    """
    print(f"Predict sentiments!")
    try:
        results = {"reviews": [], "breakdown": {"positive": 0, "neutral": 0, "negative": 0}}
        
        # Predict sentiments for all reviews
        for review in reviews:
            rating = predict_sentiment(review)
            results["reviews"].append({"review": review, "rating": rating})
            
            # Categorize sentiment
            if rating in [4, 5]:
                results["breakdown"]["positive"] += 1
            elif rating == 3:
                results["breakdown"]["neutral"] += 1
            else:
                results["breakdown"]["negative"] += 1

        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing reviews: {str(e)}")
