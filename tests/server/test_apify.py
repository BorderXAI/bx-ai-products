from apify_client import ApifyClient

# Initialize the ApifyClient with your API token
client = ApifyClient("apify_api_h65nby63yDaceLAP0V6mFVVewDrMb52d4Ts2")

# Prepare the Actor input
run_input = {
    "hashtags": ["fyp"],
    "resultsPerPage": 100,
    "profileScrapeSections": ["videos"],
    "excludePinnedPosts": False,
    "searchSection": "",
    "maxProfilesPerQuery": 10,
    "shouldDownloadVideos": False,
    "shouldDownloadCovers": False,
    "shouldDownloadSubtitles": False,
    "shouldDownloadSlideshowImages": False,
    "shouldDownloadAvatars": False,
    "shouldDownloadMusicCovers": False,
    "proxyCountryCode": "None",
}

# Run the Actor and wait for it to finish
run = client.actor("GdWCkxBtKWOsKjdch").call(run_input=run_input)

# Fetch and print Actor results from the run's dataset (if there are any)
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)