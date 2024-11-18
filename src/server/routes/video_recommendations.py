from fastapi import APIRouter, HTTPException
from typing import List, Dict
from ..services.video_ranking import VideoRankingService
from ..models.video import Video, UserPreferences
from datetime import datetime

router = APIRouter()
ranking_service = VideoRankingService()

# Mock database of videos (in production, this would be a real database)
MOCK_VIDEOS = [
    {
        "id": "1",
        "title": "Morning Skincare Routine 2024",
        "creator": "@beautyexpert",
        "views": "1.2M",
        "likes": "245K",
        "comments": "3.2K",
        "shares": "15K",
        "duration": "0:45",
        "category": "Beauty & Skincare",
        "post_date": "2024-03-19T10:00:00",
        "style_tags": ["tutorial", "product-showcase", "natural-lighting"],
        "thumbnail": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600"
    },
    # Add more mock videos here
]

@router.post("/api/recommendations/daily")
async def get_daily_recommendations(preferences: UserPreferences) -> List[Dict]:
    try:
        # In production, fetch videos from database
        videos = MOCK_VIDEOS
        
        # Rank videos based on user preferences
        ranked_videos = ranking_service.rank_videos(
            videos=videos,
            user_category=preferences.category,
            user_style=preferences.style_tags
        )
        
        return ranked_videos
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))