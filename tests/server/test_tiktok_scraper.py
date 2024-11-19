import pytest
from unittest.mock import patch, MagicMock
from src.server.services.tiktok_scraper import TikTokScraperService
import os
import json
from typing import List

@pytest.fixture
def mock_env(monkeypatch):
    monkeypatch.setenv('APIFY_TOKEN', 'test_token')

@pytest.fixture
def tiktok_service(mock_env):
    return TikTokScraperService()

@pytest.mark.asyncio
async def test_fetch_inspiration_videos_success(tiktok_service):
    mock_run = {'defaultDatasetId': 'test_dataset_id'}
    mock_items = [{
        'id': '1',
        'desc': 'Test Video',
        'video': {'downloadAddr': 'http://test.com/video1', 'duration': 30},
        'author': {'uniqueId': 'user1'},
        'stats': {
            'diggCount': 1000,
            'shareCount': 100,
            'commentCount': 50
        },
        'covers': ['http://test.com/thumbnail1'],
        'hashtags': ['test', 'video']
    }]

    # Mock the APIFY client calls
    with patch.object(tiktok_service.client, 'actor') as mock_actor, \
         patch.object(tiktok_service.client, 'dataset') as mock_dataset_method:
        mock_actor.return_value.call.return_value = mock_run
        mock_dataset = MagicMock()
        mock_dataset.iterate_items.return_value = mock_items
        mock_dataset_method.return_value = mock_dataset

        videos = await tiktok_service.fetch_inspiration_videos(['test_hashtag'])

        # Verify the results
        assert len(videos) == 1
        video = videos[0]
        assert video['id'] == '1'
        assert video['title'] == 'Test Video'
        assert video['video_url'] == 'http://test.com/video1'
        assert video['author'] == 'user1'
        assert video['likes'] == 1000
        assert video['shares'] == 100
        assert video['comments'] == 50
        assert video['duration'] == 30
        assert video['thumbnail'] == 'http://test.com/thumbnail1'
        assert video['hashtags'] == ['test', 'video']

        # Verify the API call
        mock_actor.assert_called_once_with(tiktok_service.actor_id)
        mock_actor.return_value.call.assert_called_once_with(run_input={
            'hashtags': ['test_hashtag'],
            'resultsPerPage': 20,
            'profileScrapeSections': ['videos'],
            'excludePinnedPosts': False,
            'searchSection': '',
            'maxProfilesPerQuery': 10,
            'shouldDownloadVideos': False,
            'shouldDownloadCovers': False,
            'shouldDownloadSubtitles': False,
            'shouldDownloadSlideshowImages': False,
            'shouldDownloadAvatars': False,
            'shouldDownloadMusicCovers': False,
            'proxyCountryCode': 'None',
        })

@pytest.mark.asyncio
async def test_fetch_inspiration_videos_with_default_hashtags(tiktok_service):
    mock_run = {'defaultDatasetId': 'test_dataset_id'}
    mock_items = [{
        'id': '1',
        'desc': 'Test Video',
        'video': {'downloadAddr': 'http://test.com/video1', 'duration': 30},
        'author': {'uniqueId': 'user1'},
        'stats': {
            'diggCount': 1000,
            'shareCount': 100,
            'commentCount': 50
        },
        'covers': ['http://test.com/thumbnail1'],
        'hashtags': ['skincare', 'beauty']
    }]

    # Mock the APIFY client calls
    with patch.object(tiktok_service.client, 'actor') as mock_actor, \
         patch.object(tiktok_service.client, 'dataset') as mock_dataset_method:
        mock_actor.return_value.call.return_value = mock_run
        mock_dataset = MagicMock()
        mock_dataset.iterate_items.return_value = mock_items
        mock_dataset_method.return_value = mock_dataset

        videos = await tiktok_service.fetch_inspiration_videos()

        # Verify that default hashtags were used
        mock_actor.return_value.call.assert_called_once()
        call_args = mock_actor.return_value.call.call_args[1]['run_input']
        assert call_args['hashtags'] == ['skincare', 'beauty']

@pytest.mark.asyncio
async def test_fetch_inspiration_videos_error_handling(tiktok_service):
    # Mock the APIFY client to raise an error
    with patch.object(tiktok_service.client, 'actor') as mock_actor:
        mock_actor.return_value.call.side_effect = Exception("APIFY API error")

        with pytest.raises(ValueError, match="Failed to fetch TikTok videos: APIFY API error"):
            await tiktok_service.fetch_inspiration_videos(['test_hashtag'])
