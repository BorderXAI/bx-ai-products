from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class VideoMeta(BaseModel):
    duration: int
    coverUrl: str

class AuthorMeta(BaseModel):
    name: str
    avatar: str

class MusicMeta(BaseModel):
    musicName: str
    musicAuthor: str
    musicOriginal: bool

class TikTokVideo(BaseModel):
    id: str
    title: str
    text: str
    video_url: str
    thumbnail: str
    author: str
    createTimeISO: str
    webVideoUrl: str
    videoMeta: VideoMeta
    authorMeta: AuthorMeta
    duration: int
    likes: int
    comments: int
    shares: int
    diggCount: int
    shareCount: int
    playCount: int
    commentCount: int
    collectCount: int
    hashtags: List[str]  # List of strings, not objects
    musicMeta: MusicMeta

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