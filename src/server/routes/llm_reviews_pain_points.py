# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel
# from typing import List
# from openai import OpenAI
# import logging
# from dotenv import load_dotenv
# import os

# # Load environment variables from .env file
# load_dotenv()
# openai_key = os.getenv("OPENAI_API_KEY")

# # Initialize the OpenAI client
# client = OpenAI(api_key=openai_key)

# # Configure logging
# logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
# logger = logging.getLogger(__name__)

# router = APIRouter()


# # Request model for the API
# class ReviewSummarizationRequest(BaseModel):
#     reviews: List[dict]  # Each review will have text and a rating field


# # Response model for the API
# class ReviewSummarizationResponse(BaseModel):
#     summary: str
#     pain_points: List[str]


# @router.post("/summarize-reviews", response_model=ReviewSummarizationResponse)
# async def summarize_reviews(request: ReviewSummarizationRequest):
#     """
#     Summarize low-rated reviews using OpenAI's API.
#     """
#     try:
#         logger.info("Received summarize-reviews request.")
#         logger.debug(f"Request data: {request}")

#         # Filter reviews with rating <= 3
#         low_rated_reviews = [
#             review["review"] for review in request.reviews if int(float(review["rating"])) <= 3
#         ]

#         if not low_rated_reviews:
#             low_rated_reviews = [
#                 review["review"] for review in request.reviews if int(float(review["rating"])) <= 4
#             ]

#         logger.debug(f"Filtered low-rated reviews: {low_rated_reviews}")

#         # if not low_rated_reviews:
#         #     logger.warning("No low-rated reviews found.")
#         #     # raise HTTPException(
#         #     #     status_code=400,
#         #     #     detail="No reviews with a rating of 3 or less were found.",
#         #     # )
#         #     low_rated_reviews = 

#         # Prepare the prompt with examples for OpenAI
#         prompt = (
#             "You are a helpful assistant tasked with analyzing low-rated product reviews. "
#             "Your goal is to identify key pain points and areas of dissatisfaction mentioned in the reviews. "
#             "Follow these strict rules while generating the response:\n\n"
#             "1. Start the response with 'Summary:' followed by a concise summary of the main issues.\n"
#             "2. Use a clear and structured format for pain points:\n"
#             "   - Each pain point must start with a dash ('- ').\n"
#             "   - Pain points should be short, specific, and actionable.\n"
#             "   - Avoid merging multiple pain points into one; list each as a separate bullet point.\n"
#             "3. Do not include any extra commentary or unrelated information.\n\n"
#             "Example:\n"
#             "Reviews:\n"
#             "- The product stopped working after a week. Customer service was unresponsive.\n"
#             "- The quality is poor and does not match the description.\n"
#             "- It takes too long to charge and the battery drains quickly.\n\n"
#             "Summary: Customers frequently complained about the product's durability, poor quality, and battery issues.\n\n"
#             "Pain Points:\n"
#             "- Product stopped working quickly\n"
#             "- Poor customer service\n"
#             "- Low-quality materials\n"
#             "- Long charging time and poor battery life\n\n"
#             "Now, analyze the following reviews and return the summary and pain points:\n"
#         )
#         prompt += "\n".join(f"- {review}" for review in low_rated_reviews)

#         logger.debug(f"Generated prompt for OpenAI: {prompt}")

#         # Call OpenAI's API using the new format
#         # Call OpenAI's API using the new format
#         response = client.chat.completions.create(
#             model="gpt-4o",
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant."},
#                 {"role": "user", "content": prompt},
#             ]
#         )

#         logger.info("Received response from OpenAI.")
#         logger.debug(f"OpenAI response: {response}")

#         # Extract the content from the response
#         content = response.choices[0].message.content
#         logger.debug(f"Response content: {content}")

#         # Separate the summary and pain points
#         lines = content.split("\n")
#         summary = None
#         pain_points = []

#         for line in lines:
#             if line.startswith("Summary:"):
#                 summary = line.replace("Summary:", "").strip()
#             elif line.startswith("- "):
#                 pain_points.append(line.strip())

#         if not summary:
#             logger.error("Failed to parse summary from OpenAI response.")
#             raise HTTPException(
#                 status_code=500, detail="Failed to parse summary from OpenAI response."
#             )

#         logger.info("Successfully parsed summary and pain points.")
#         return {"summary": summary, "pain_points": pain_points}
#     except Exception as e:
#         logger.exception("Error processing summarize-reviews request.")
#         raise HTTPException(status_code=500, detail=f"Error with OpenAI API: {str(e)}")

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from openai import OpenAI
import logging
from dotenv import load_dotenv
import os

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
    pain_points: List[str] = []  # Defaults to empty list if no pain points exist


@router.post("/summarize-reviews", response_model=ReviewSummarizationResponse)
async def summarize_reviews(request: ReviewSummarizationRequest):
    """
    Summarize product reviews using OpenAI's API with a flexible fallback mechanism.
    """
    try:
        logger.info("Received summarize-reviews request.")
        logger.debug(f"Request data: {request}")

        # Define fallback rating thresholds (first ≤3, then ≤4, then ≤5)
        low_rated_reviews = []
        for threshold in [3, 4, 5]:
            low_rated_reviews = [
                review["review"] for review in request.reviews if int(float(review["rating"])) <= threshold
            ]
            if low_rated_reviews:
                logger.debug(f"Using reviews with rating <= {threshold}")
                break

        # If there are no reviews at all, return a friendly message
        if not request.reviews:
            return {
                "summary": "No reviews available for summarization.",
                "pain_points": []
            }

        # Prepare the prompt for OpenAI
        prompt = (
            "You are a helpful assistant analyzing product reviews. "
            "Identify key pain points and areas of dissatisfaction mentioned in the reviews if they exist. "
            "If no major issues are found, provide a general summary of customer feedback instead.\n\n"
            "1. If issues exist, start with 'Summary:' followed by a concise summary of the main concerns.\n"
            "2. If pain points exist, list them under 'Pain Points:' with bullet points.\n"
            "3. If no pain points are found, summarize the positive aspects of the reviews instead.\n\n"
            "Example:\n"
            "Reviews:\n"
            "- The product stopped working after a week. Customer service was unresponsive.\n"
            "- The quality is poor and does not match the description.\n"
            "- It takes too long to charge and the battery drains quickly.\n\n"
            "Response:\n"
            "Summary: Customers frequently complained about durability, poor quality, and battery issues.\n"
            "Pain Points:\n"
            "- Product stopped working quickly\n"
            "- Poor customer service\n"
            "- Low-quality materials\n"
            "- Long charging time and poor battery life\n\n"
            "If no pain points exist, summarize the overall feedback instead:\n\n"
            "Reviews:\n"
            "- Very stylish and modern design.\n"
            "- Comfortable for long use.\n"
            "- Looks exactly as described and is easy to assemble.\n\n"
            "Response:\n"
            "Summary: Customers love the stylish design, comfort, and easy assembly of this product.\n"
            "Pain Points: None\n\n"
            "Now, analyze the following reviews:\n"
        )
        prompt += "\n".join(f"- {review}" for review in low_rated_reviews)

        logger.debug(f"Generated prompt for OpenAI: {prompt}")

        # Call OpenAI's API
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ]
        )

        logger.info("Received response from OpenAI.")
        content = response.choices[0].message.content
        logger.debug(f"Response content: {content}")

        # Extract summary and pain points
        lines = content.split("\n")
        summary = None
        pain_points = []

        for line in lines:
            if line.startswith("Summary:"):
                summary = line.replace("Summary:", "").strip()
            elif line.startswith("- "):
                pain_points.append(line.strip())

        # If summary is missing, let the LLM summarize **all reviews dynamically**
        if not summary:
            summary = "General customer feedback could not be summarized."

        return {"summary": summary, "pain_points": pain_points if pain_points else []}

    except Exception as e:
        logger.exception("Error processing summarize-reviews request.")
        return {
            "summary": "An error occurred while processing the request. Please try again later.",
            "pain_points": []
        }
