from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import logging
from ..services.amazon.amazon_reviews_scraper import scrape_amazon_reviews

# Configure logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

router = APIRouter()

# Request model
class AmazonScraperRequest(BaseModel):
    url: str

# Response model
class AmazonScraperResponse(BaseModel):
    product_name: str
    reviews: List[dict]

@router.post("/scrape", response_model=AmazonScraperResponse)
async def scrape_amazon(request: AmazonScraperRequest):
    """
    Scrape product information and reviews from Amazon.
    """
    logging.info(f"Received scrape request for URL: {request.url}")
    
    try:
        # Call the scraper utility function
        result = scrape_amazon_reviews(request.url)
        
        # Debugging log for the scraper result
        logging.debug(f"Scraper result: {result}")
        
        # Return the scraped result
        return result
    except ValueError as ve:
        # Handle expected errors (e.g., invalid URL or missing data)
        logging.warning(f"ValueError encountered: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        # Handle unexpected errors
        logging.error(f"Unexpected error during scraping: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error while scraping Amazon product.")
