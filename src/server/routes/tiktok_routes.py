from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional
from ..services.tiktok_scraper import TikTokScraperService
from pydantic import BaseModel, Field
import logging
import json
from ..redis_client import get_redis_client

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()
tiktok_service = TikTokScraperService()

class TikTokVideo(BaseModel):
    """TikTok video response model"""
    id: str
    title: str
    text: str
    video_url: str
    thumbnail: str
    author: str
    createTimeISO: str
    webVideoUrl: str
    videoMeta: Dict[str, Any]
    authorMeta: Dict[str, Any]
    duration: int
    likes: int
    comments: int
    shares: int
    diggCount: int
    shareCount: int
    playCount: int
    commentCount: int
    collectCount: int
    hashtags: List[str]
    musicMeta: Dict[str, Any]

    class Config:
        schema_extra = {
            "example": {
                "id": "7123456789",
                "title": "My morning skincare routine 💫 #skincare #beauty",
                "text": "My morning skincare routine 💫 #skincare #beauty",
                "video_url": "https://www.tiktok.com/@user/video/7123456789",
                "thumbnail": "https://p16-sign-va.tiktokcdn.com/...",
                "author": "skincare_expert",
                "createTimeISO": "2024-01-01T00:00:00.000Z",
                "webVideoUrl": "https://www.tiktok.com/@user/video/7123456789",
                "videoMeta": {
                    "duration": 60,
                    "coverUrl": "https://p16-sign-va.tiktokcdn.com/..."
                },
                "authorMeta": {
                    "name": "skincare_expert",
                    "avatar": "https://p16-sign-va.tiktokcdn.com/..."
                },
                "duration": 60,
                "likes": 150000,
                "comments": 1200,
                "shares": 500,
                "diggCount": 150000,
                "shareCount": 500,
                "playCount": 1000000,
                "commentCount": 1200,
                "collectCount": 300,
                "hashtags": ["skincare", "beauty"],
                "musicMeta": {
                    "musicName": "Original Sound",
                    "musicAuthor": "skincare_expert",
                    "musicOriginal": True
                }
            }
        }

@router.get(
    "/api/inspiration-videos",
    response_model=List[TikTokVideo],
    summary="Get TikTok inspiration videos",
    description="""
    Fetch TikTok videos based on hashtags for inspiration.
    
    - If no hashtags are provided, default hashtags (skincare, beauty) will be used
    - Videos are sorted by relevance and engagement
    - Results are limited to 20 videos per request
    """,
    response_description="List of TikTok videos with metadata",
    tags=["inspiration"]
)
async def get_inspiration_videos(
    hashtags: Optional[str] = Query(
        None,
        description="Comma-separated list of hashtags to search for (e.g., 'skincare,beauty')",
        regex="^[a-zA-Z0-9,\\s]*$",
        example="skincare,beauty"
    )
) -> List[TikTokVideo]:
    try:
        #redis
        redis_client = await get_redis_client()
        
        # Convert comma-separated string to list and clean up hashtags
        hashtag_list = None
        if hashtags:
            # Split by comma and clean each hashtag
            hashtag_list = [
                tag.strip().lower().replace('#', '') 
                for tag in hashtags.split(',') 
                if tag.strip()
            ]
            logger.info(f"Searching for hashtags: {hashtag_list}")
            
        # Create a cache key using the hashtags
        cache_key = f"inspiration_videos:{','.join(hashtag_list)}" if hashtag_list else "inspiration_videos:default"

        # Check Redis cache for existing data
        cached_data = await redis_client.get(cache_key)
        if cached_data:
            logger.info("Cache hit for key: {cache_key}")
            return [TikTokVideo(**video) for video in json.loads(cached_data)]
        else:
            logger.info("Cache miss for key: {cache_key}")
        
        # If no cache hit, fetch data from TikTok service
        videos = await tiktok_service.fetch_inspiration_videos(hashtag_list)
        
        # Store the result in Redis cache for 1 hour (3600 seconds)
        await redis_client.setex(cache_key, 3600, json.dumps([video.dict() for video in videos]))
        # Log cache storage
        logger.info(f"Stored data in cache with key: {cache_key}")  

        return videos
    
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail={
                "message": str(e),
                "type": "ValidationError",
                "params": {"hashtags": hashtags}
            }
        )
    except Exception as e:
        logger.error(f"Server error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "message": "An error occurred while fetching videos",
                "type": "ServerError"
            }
        )
