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
    # Initialize a dictionary for the ratings breakdown
    ratings_breakdown = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0}

    # Iterate over the reviews and count ratings
    for review in reviews:
        try:
            rating = int(float(review.get('rating', 0)))  # Convert to integer
            if str(rating) in ratings_breakdown:
                ratings_breakdown[str(rating)] += 1
        except ValueError:
            continue  # Skip invalid ratings

    # Calculate percentages
    total_reviews = len(reviews)
    if total_reviews > 0:
        for key in ratings_breakdown:
            ratings_breakdown[key] = (ratings_breakdown[key] / total_reviews) * 100

    return ratings_breakdown

