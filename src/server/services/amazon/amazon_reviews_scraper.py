import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


def scrape_amazon_reviews(product_url, email, password):
    """
    Scrapes Amazon product reviews for a given product URL in headless mode.

    Args:
        product_url (str): The URL of the Amazon product.
        email (str): Amazon account email for login.
        password (str): Amazon account password.

    Returns:
        dict: A dictionary containing the product name, product ID, and reviews.
    """
    # Set up the undetected Chrome driver with headless mode
    options = uc.ChromeOptions()
    options.add_argument("--headless")  # Run in headless mode
    options.add_argument("--disable-gpu")  # Disable GPU (recommended for headless mode)
    options.add_argument("--no-sandbox")  # Disable sandbox for non-root environments
    options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource issues
    options.add_argument("--window-size=1920x1080")  # Set the window size

    driver = uc.Chrome(options=options)
    reviews_data = []

    try:
        driver.get(product_url)
        time.sleep(3)  # Allow the page to load

        # Scrape product name and ID
        product_name = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "productTitle"))
        ).text.strip()

        product_id = driver.current_url.split("/dp/")[1].split("/")[0] if "/dp/" in driver.current_url else "N/A"

        # Scrape reviews from the first page
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".review-text-content span"))
        )
        reviews = driver.find_elements(By.CSS_SELECTOR, ".review-text-content span")
        ratings = driver.find_elements(By.CSS_SELECTOR, "i[data-hook='review-star-rating'] span.a-icon-alt")

        for review, rating in zip(reviews, ratings):
            rating_value = rating.get_attribute("innerHTML").split(" ")[0] if rating.get_attribute("innerHTML") else "No Rating"
            reviews_data.append({
                "review": review.text.strip() if review.text else "No Review Text",
                "rating": rating_value
            })

        # Click "See more reviews" button and handle login
        see_more_reviews_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "a[data-hook='see-all-reviews-link-foot']"))
        )
        see_more_reviews_button.click()
        time.sleep(3)  # Allow reviews page to load

        # Check for login prompt
        try:
            login_email_input = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, "ap_email"))
            )
            login_email_input.send_keys(email)

            driver.find_element(By.ID, "continue").click()

            password_input = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, "ap_password"))
            )
            password_input.send_keys(password)

            driver.find_element(By.ID, "signInSubmit").click()
            time.sleep(3)  # Allow page to reload after login
        except Exception:
            print("Login not required or login process failed.")

        # Continue scraping reviews after login
        while True:
            WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".review-text-content span"))
            )
            reviews = driver.find_elements(By.CSS_SELECTOR, ".review-text-content span")
            ratings = driver.find_elements(By.CSS_SELECTOR, "i[data-hook='review-star-rating'] span.a-icon-alt")

            for review, rating in zip(reviews, ratings):
                rating_value = rating.get_attribute("innerHTML").split(" ")[0] if rating.get_attribute("innerHTML") else "No Rating"
                reviews_data.append({
                    "review": review.text.strip() if review.text else "No Review Text",
                    "rating": rating_value
                })

            # Check if "Next" button exists and is clickable
            next_buttons = driver.find_elements(By.CLASS_NAME, "a-last")
            if not next_buttons or "a-disabled" in next_buttons[0].get_attribute("class"):
                break
            next_buttons[0].click()
            time.sleep(3)  # Allow new page to load

    except Exception as e:
        print(f"Error scraping Amazon reviews: {e}")
    finally:
        driver.quit()

    return {
        "product_name": product_name,
        "product_id": product_id,
        "reviews": reviews_data
    }


def process_ratings(reviews):
    """
    Processes the ratings from reviews to calculate the ratings breakdown.

    Args:
        reviews (list): A list of reviews, each containing a 'rating' key.

    Returns:
        dict: A dictionary with rating percentages for 1-5 stars.
    """
    ratings_breakdown = {str(i): 0 for i in range(1, 6)}

    for review in reviews:
        try:
            rating = int(float(review.get('rating', 0)))
            if str(rating) in ratings_breakdown:
                ratings_breakdown[str(rating)] += 1
        except ValueError:
            continue  # Ignore invalid ratings

    total_reviews = len(reviews)
    if total_reviews > 0:
        for key in ratings_breakdown:
            ratings_breakdown[key] = round((ratings_breakdown[key] / total_reviews) * 100, 2)

    return ratings_breakdown
