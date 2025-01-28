from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import openai

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
        # Filter reviews with rating <= 3
        low_rated_reviews = [
            review["review"] for review in request.reviews if int(review["rating"]) <= 3
        ]

        if not low_rated_reviews:
            raise HTTPException(
                status_code=400,
                detail="No reviews with a rating of 3 or less were found.",
            )

        # Prepare the prompt for OpenAI
        prompt = (
            "You are a helpful assistant. Analyze the following low-rated product reviews "
            "and summarize the pain points and major areas of dissatisfaction:\n\n"
            + "\n\n".join(f"- {review}" for review in low_rated_reviews)
        )

        # Call OpenAI's API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "system", "content": prompt}],
            max_tokens=500,
        )

        # Extract and return the result
        content = response["choices"][0]["message"]["content"]
        pain_points = content.split("\n")  # Adjust parsing as needed
        return {"summary": content, "pain_points": pain_points}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error with OpenAI API: {str(e)}")
