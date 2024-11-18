from typing import List, Dict, Optional
import numpy as np
from datetime import datetime, timedelta

class VideoRankingService:
    def __init__(self):
        self.engagement_weight = 0.4
        self.recency_weight = 0.2
        self.relevance_weight = 0.4
        
    def calculate_engagement_score(self, video: Dict) -> float:
        """Calculate engagement score based on views, likes, comments, and shares"""
        try:
            # Convert metrics to numerical values
            views = float(video['views'].replace('M', '000000').replace('K', '000'))
            likes = float(video['likes'].replace('M', '000000').replace('K', '000'))
            comments = float(video['comments'].replace('M', '000000').replace('K', '000'))
            shares = float(video['shares'].replace('M', '000000').replace('K', '000'))
            
            # Calculate engagement rate
            engagement_rate = (likes + comments * 2 + shares * 3) / views
            
            # Normalize between 0 and 1
            return min(engagement_rate * 100, 1.0)
        except (KeyError, ValueError):
            return 0.0

    def calculate_recency_score(self, video: Dict) -> float:
        """Calculate recency score based on post date"""
        try:
            post_date = datetime.fromisoformat(video.get('post_date', datetime.now().isoformat()))
            days_old = (datetime.now() - post_date).days
            
            # Exponential decay over 30 days
            return np.exp(-days_old / 30)
        except (ValueError, TypeError):
            return 0.0

    def calculate_relevance_score(self, video: Dict, user_category: str, user_style: List[str]) -> float:
        """Calculate relevance score based on category match and style similarity"""
        try:
            # Category match (exact or related categories)
            category_score = 1.0 if video['category'].lower() == user_category.lower() else 0.5
            
            # Style match (percentage of matching style elements)
            video_style = set(video.get('style_tags', []))
            user_style_set = set(user_style)
            style_score = len(video_style.intersection(user_style_set)) / max(len(user_style_set), 1)
            
            return (category_score + style_score) / 2
        except (KeyError, TypeError):
            return 0.0

    def rank_videos(self, videos: List[Dict], user_category: str, user_style: List[str]) -> List[Dict]:
        """Rank videos based on engagement, recency, and relevance"""
        ranked_videos = []
        
        for video in videos:
            # Calculate individual scores
            engagement_score = self.calculate_engagement_score(video)
            recency_score = self.calculate_recency_score(video)
            relevance_score = self.calculate_relevance_score(video, user_category, user_style)
            
            # Calculate final score
            final_score = (
                engagement_score * self.engagement_weight +
                recency_score * self.recency_weight +
                relevance_score * self.relevance_weight
            )
            
            ranked_videos.append({
                **video,
                'ranking_score': final_score,
                'scores': {
                    'engagement': engagement_score,
                    'recency': recency_score,
                    'relevance': relevance_score
                }
            })
        
        # Sort by final score in descending order
        ranked_videos.sort(key=lambda x: x['ranking_score'], reverse=True)
        
        return ranked_videos[:6]  # Return top 6 videos