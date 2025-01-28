import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from collections import Counter

def scrape_amazon_reviews(product_url, email, password):
    options = uc.ChromeOptions()
    driver = uc.Chrome(options=options)
    driver.get(product_url)
    time.sleep(3)

    try:
        product_name = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "productTitle"))
        ).text.strip()
    except Exception:
        product_name = "Unknown Product"

    try:
        reviews = []
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".review-text-content span"))
        )
        reviews_elements = driver.find_elements(By.CSS_SELECTOR, ".review-text-content span")
        ratings_elements = driver.find_elements(By.CSS_SELECTOR, "i[data-hook='review-star-rating'] span.a-icon-alt")

        for review, rating in zip(reviews_elements, ratings_elements):
            reviews.append({
                "review": review.text.strip(),
                "rating": rating.get_attribute("innerHTML").split(" ")[0] if rating else "No Rating",
            })
    except Exception as e:
        print(f"Error while scraping reviews: {e}")
        reviews = []

    driver.quit()

    return {
        "product_name": product_name,
        "reviews": reviews,
    }


def process_ratings(reviews):
    ratings_count = Counter(review['rating'] for review in reviews)
    total_reviews = len(reviews)
    ratings_percentage = {str(i): (ratings_count.get(str(i), 0) / total_reviews) * 100 for i in range(1, 6)}
    return ratings_percentage
