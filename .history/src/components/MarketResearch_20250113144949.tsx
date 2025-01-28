from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time


def scrape_tiktok_videos(keyword):
    # Set up the WebDriver (ensure you have the correct ChromeDriver installed)
    driver = webdriver.Chrome()
    driver.get("https://www.tiktok.com/")

    # Wait for the page to load
    time.sleep(5)

    # Locate the search bar and perform a search
    search_bar = driver.find_element(By.XPATH, '//input[@placeholder="Search accounts and videos"]')
    search_bar.send_keys(keyword)
    search_bar.send_keys(Keys.RETURN)

    # Wait for the search results to load
    time.sleep(5)

    # Switch to the "Videos" tab
    videos_tab = driver.find_element(By.XPATH, '//div[text()="Videos"]')  # Locate the "Videos" tab by its text
    videos_tab.click()

    # Wait for the Videos tab content to load
    time.sleep(5)

    # Scrape video URLs from search results
    video_urls = []
    videos = driver.find_elements(By.XPATH, '//a[contains(@href, "/video/")]')
    for video in videos:
        video_urls.append(video.get_attribute("href"))

    driver.quit()
    return list(set(video_urls))  # Remove duplicates


if __name__ == "__main__":
    keyword = input("Enter a keyword to search on TikTok: ")
    urls = scrape_tiktok_videos(keyword)
    print(f"Found {len(urls)} videos:")
    for url in urls:
        print(url)