from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from ..services.amazon.amazon_reviews_scraper import scrape_amazon_reviews

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
    try:
        # Call the scraper utility function
        result = scrape_amazon_reviews(request.url)
        print(result)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error scraping Amazon product: {str(e)}")
