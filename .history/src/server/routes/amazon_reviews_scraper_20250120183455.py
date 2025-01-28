from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import logging
from ..services.amazon.amazon_reviews_scraper import scrape_amazon_reviews, process_ratings

# Configure logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

router = APIRouter()


# Request model
class AmazonScraperRequest(BaseModel):
    url: str
    email: str
    password: str


# Response model
class AmazonScraperResponse(BaseModel):
    product_name: str
    reviews: List[dict]
    ratings_breakdown: Dict[str, float]  # New field for ratings breakdown


@router.post("/scrape", response_model=AmazonScraperResponse)
async def scrape_amazon(request: AmazonScraperRequest):
    """
    Scrape product information and reviews from Amazon.
    """
    logging.info(f"Received scrape request for URL: {request.url}")
    
    try:
        # Call the scraper utility function with email and password
        result = scrape_amazon_reviews(request.url, request.email, request.password)
        
        # Debugging log for the scraper result
        logging.debug(f"Scraper result: {result}")
        
        # Process ratings to calculate breakdown
        ratings_breakdown = process_ratings(result['reviews'])
        logging.debug(f"Ratings breakdown: {ratings_breakdown}")
        
        # Include ratings breakdown in the response
        return {
            "product_name": result['product_name'],
            "reviews": result['reviews'],
            "ratings_breakdown": ratings_breakdown
        }
    except ValueError as ve:
        # Handle expected errors (e.g., invalid URL or missing data)
        logging.warning(f"ValueError encountered: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        # Handle unexpected errors
        logging.error(f"Unexpected error during scraping: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error while scraping Amazon product.")
