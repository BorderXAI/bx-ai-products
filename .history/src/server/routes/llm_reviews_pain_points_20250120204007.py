from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import openai
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Set the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

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
            "You are a helpful assistant tasked with analyzing low-rated product reviews. "
            "Identify key pain points and dissatisfaction areas, and return a summary and pain points in the format below:\n\n"
            "Example:\n"
            "Summary: Customers complained about durability and poor customer service.\n"
            "Pain Points:\n- Short product lifespan\n- Unresponsive support\n\n"
            f"Reviews:\n{low_rated_reviews}"
        )

        # Call OpenAI's API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=500,
        )

        # Extract content
        content = response["choices"][0]["message"]["content"]
        lines = content.split("\n")
        summary = ""
        pain_points = []
        for line in lines:
            if line.startswith("Summary:"):
                summary = line.replace("Summary:", "").strip()
            elif line.startswith("- "):
                pain_points.append(line.strip())

        return {"summary": summary, "pain_points": pain_points}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error with OpenAI API: {str(e)}")
