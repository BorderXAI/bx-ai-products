from typing import List, Optional, Dict, Any
import os
import json
import logging
from dotenv import load_dotenv
from apify_client import ApifyClient

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TikTokScraperService:
    def __init__(self):
        load_dotenv()
        self.apify_token = os.getenv('APIFY_TOKEN')
        if not self.apify_token:
            raise ValueError("APIFY_TOKEN environment variable is not set")
        
        self.client = ApifyClient(self.apify_token)
        self.actor_id = "clockworks~tiktok-scraper"  # TikTok Hashtag Scraper actor
        self.default_results_per_page = 10
        self.default_hashtags = ["skincare", "beauty"]

    async def fetch_inspiration_videos(self, hashtags: Optional[List[str]] = None, limit: Optional[int] = None) -> List[Dict[str, Any]]:
        """
        Fetch inspiration videos from TikTok based on hashtags
        
        Args:
            hashtags: List of hashtags to search for. If None, uses default hashtags.
            limit: Maximum number of videos to fetch. If None, uses default_results_per_page.
            
        Returns:
            List of video data dictionaries containing:
            - id: str
            - title: str
            - text: str
            - video_url: str
            - thumbnail: str
            - author: str
            - createTimeISO: str
            - webVideoUrl: str
            - videoMeta: Dict[str, Any]
            - authorMeta: Dict[str, Any]
            - duration: int
            - likes: int
            - comments: int
            - shares: int
            - diggCount: int
            - shareCount: int
            - playCount: int
            - commentCount: int
            - collectCount: int
            - hashtags: List[str]
            - musicMeta: Dict[str, Any]
        """
        try:
            # Use default hashtags if none provided
            search_hashtags = hashtags if hashtags else self.default_hashtags
            results_per_page = limit if limit else self.default_results_per_page
            logger.info(f"Fetching {results_per_page} videos for hashtags: {search_hashtags}")

            # Prepare the Actor input
            run_input = {
                "hashtags": search_hashtags,
                "resultsPerPage": results_per_page,
                "searchSection": "/video",
                "maxProfilesPerQuery": 20,
                "shouldDownloadCovers": True,
                "shouldDownloadAvatars": True,
                "proxyCountryCode": "US"
            }

            logger.info(f"APIFY Actor input: {json.dumps(run_input, indent=2)}")

            try:
                # Run the Actor and wait for it to finish
                run = self.client.actor(self.actor_id).call(run_input=run_input)
                
                if not run:
                    raise ValueError("Failed to start APIFY actor run")

                logger.info(f"APIFY run started successfully with ID: {run.get('id')}")
                logger.info(f"APIFY run status: {run.get('status')}")
                logger.info(f"APIFY dataset ID: {run.get('defaultDatasetId')}")

            except Exception as e:
                logger.error(f"Error running APIFY actor: {str(e)}", exc_info=True)
                raise ValueError(f"APIFY actor error: {str(e)}")

            try:
                # Get the dataset items
                dataset = self.client.dataset(run["defaultDatasetId"])
                dataset_items = list(dataset.iterate_items())
                
                logger.info(f"Number of items returned from APIFY: {len(dataset_items)}")
                if dataset_items:
                    logger.info(f"Raw APIFY response structure for first item:\n{json.dumps(dataset_items[0], indent=2)}")
                else:
                    logger.warning("No items returned from APIFY")
                    return []

            except Exception as e:
                logger.error(f"Error fetching dataset items: {str(e)}", exc_info=True)
                raise ValueError(f"Failed to fetch dataset items: {str(e)}")

            transformed_videos = []
            for item in dataset_items:
                try:
                    # 检查必要的字段
                    if not item.get('id'):
                        logger.warning(f"Skipping item without ID: {item}")
                        continue
                    
                    stats = item.get('stats', {})
                    video = item.get('video', {})
                    author = item.get('author', {})
                    music = item.get('music', {})
                    
                    # 添加详细的字段日志
                    logger.debug(f"Processing video ID {item.get('id')}:")
                    logger.debug(f"- Stats available fields: {list(stats.keys())}")
                    logger.debug(f"- Video available fields: {list(video.keys())}")
                    logger.debug(f"- Author available fields: {list(author.keys())}")
                    logger.debug(f"- Music available fields: {list(music.keys())}")
                    
                    video_data = {
                        'id': str(item.get('id', '')),
                        'title': str(item.get('text', '')),
                        'text': str(item.get('text', '')),
                        'video_url': str(item.get('webVideoUrl', '')),
                        'thumbnail': str(item.get('videoMeta', {}).get('coverUrl', '')),
                        'author': str(item.get('authorMeta', {}).get('name', '')),
                        'createTimeISO': str(item.get('createTimeISO', '')),
                        'webVideoUrl': str(item.get('webVideoUrl', '')),
                        'videoMeta': {
                            'duration': int(item.get('videoMeta', {}).get('duration', 0)),
                            'coverUrl': str(item.get('videoMeta', {}).get('coverUrl', ''))
                        },
                        'authorMeta': {
                            'name': str(item.get('authorMeta', {}).get('name', '')),
                            'avatar': str(item.get('authorMeta', {}).get('avatar', ''))
                        },
                        'duration': int(item.get('videoMeta', {}).get('duration', 0)),
                        'likes': int(item.get('diggCount', 0)),
                        'comments': int(item.get('commentCount', 0)),
                        'shares': int(item.get('shareCount', 0)),
                        'diggCount': int(item.get('diggCount', 0)),
                        'shareCount': int(item.get('shareCount', 0)),
                        'playCount': int(item.get('playCount', 0)),
                        'commentCount': int(item.get('commentCount', 0)),
                        'collectCount': int(item.get('collectCount', 0)),
                        'hashtags': [tag.get('name', '') for tag in item.get('hashtags', []) if isinstance(tag, dict)],
                        'musicMeta': {
                            'musicName': str(item.get('musicMeta', {}).get('musicName', '')),
                            'musicAuthor': str(item.get('musicMeta', {}).get('musicAuthor', '')),
                            'musicOriginal': bool(item.get('musicMeta', {}).get('musicOriginal', False))
                        }
                    }
                    
                    # 添加调试日志
                    logger.info(f"Transformed video data:\n{json.dumps(video_data, indent=2)}")
                    
                    transformed_videos.append(video_data)
                    
                except Exception as e:
                    logger.error(f"Error processing video item: {str(e)}", exc_info=True)
                    continue
                
            logger.info(f"Successfully transformed {len(transformed_videos)} videos")
            return transformed_videos
            
        except Exception as e:
            logger.error(f"Error in fetch_inspiration_videos: {str(e)}", exc_info=True)
            raise ValueError(str(e))
