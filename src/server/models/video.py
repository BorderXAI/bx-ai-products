from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Video(BaseModel):
    id: str
    title: str
    creator: str
    views: str
    likes: str
    comments: str
    shares: str
    duration: str
    category: str
    post_date: datetime
    style_tags: List[str]
    thumbnail: str

class UserPreferences(BaseModel):
    category: str
    style_tags: List[str]
    target_audience: Optional[str] = None