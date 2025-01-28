import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
import time

def scrape_amazon_reviews(product_url, max_pages=8):
    # Initialize undetected ChromeDriver
    options = uc.ChromeOptions()
    options.add_argument("--headless")  # Enable headless mode if needed
    options.add_argument("--disable-blink-features=AutomationControlled")
    driver = uc.Chrome(options=options)

    driver.get(product_url)
    time.sleep(2)

    reviews = []

    for _ in range(max_pages):
        try:
            # Find all review elements on the page
            review_elements = driver.find_elements(By.CSS_SELECTOR, '.review-text-content span')
            for review_element in review_elements:
                reviews.append(review_element.text)

            # Click the "Next" button
            next_button = driver.find_element(By.CSS_SELECTOR, 'li.a-last a')
            next_button.click()
            time.sleep(2)  # Wait for the next page to load

        except Exception as e:
            print("No more pages or error occurred:", e)
            break

    driver.quit()
    return reviews

# Amazon product page URL (replace with an actual Amazon product URL)
product_url = 'https://www.amazon.com/dp/B09W9ZN35Z'
scraped_reviews = scrape_amazon_reviews(product_url)

# Print scraped reviews
print("Scraped Reviews:")
for review in scraped_reviews:
    print("-", review)
