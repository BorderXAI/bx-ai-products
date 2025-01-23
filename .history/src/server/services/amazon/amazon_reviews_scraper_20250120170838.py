import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json
import os


def scrape_amazon_reviews(product_url):
    # Prompt user for email and password
    email = input("Enter your Amazon email: ")
    password = input("Enter your Amazon password: ")

    # Set up the undetected Chrome driver
    options = uc.ChromeOptions()
    options.add_argument("--start-maximized")  # Start browser maximized
    driver = uc.Chrome(options=options)  # Using undetected-chromedriver

    driver.get(product_url)
    time.sleep(3)  # Allow the page to load

    # Scrape product name and ID
    try:
        product_name = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "productTitle"))
        ).text.strip()
    except Exception as e:
        product_name = f"Product Name Not Found: {e}"

    try:
        if '/dp/' in driver.current_url:
            product_id = driver.current_url.split('/dp/')[1].split('/')[0]
        else:
            product_id = "N/A"
    except Exception as e:
        product_id = f"Product ID Not Found: {e}"

    reviews_data = []

    # Scrape reviews from the first page
    try:
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
    except Exception as e:
        print(f"Error scraping first page reviews: {e}")

    # Click "See more reviews" button and handle login
    try:
        see_more_reviews_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "a[data-hook='see-all-reviews-link-foot']"))
        )
        see_more_reviews_button.click()
        time.sleep(3)  # Allow reviews page to load

        # Check for login prompt
        login_email_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "ap_email"))
        )
        login_email_input.send_keys(email)

        continue_button = driver.find_element(By.ID, "continue")
        continue_button.click()

        password_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "ap_password"))
        )
        password_input.send_keys(password)

        login_button = driver.find_element(By.ID, "signInSubmit")
        login_button.click()

        time.sleep(3)  # Allow page to reload after login
    except Exception as e:
        print(f"Login not completed or not required: {e}")

    # Continue scraping reviews after login
    while True:
        try:
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

            # Click 'Next' button if available
            next_buttons = driver.find_elements(By.CLASS_NAME, "a-last")
            if not next_buttons or "a-disabled" in next_buttons[0].get_attribute("class"):
                break
            next_buttons[0].click()
            time.sleep(3)  # Allow new page to load
        except Exception as e:
            print(f"Error while scraping reviews or navigating pages: {e}")
            break

    driver.quit()

    return {
        "product_name": product_name,
        "product_id": product_id,
        "reviews": reviews_data
    }

# Example usage
product_url = input("Enter the Amazon product URL: ")
data = scrape_amazon_reviews(product_url)

# Create folder with the product's name
product_name = data["product_name"].replace("/", "-").replace("\\", "-")  # Replace invalid characters
output_dir = os.path.join("scraped_data", product_name)
os.makedirs(output_dir, exist_ok=True)  # Create folder if it doesn't exist

# Save the JSON file in the product-named folder
output_file = os.path.join(output_dir, "amazon_reviews.json")
with open(output_file, "w") as file:
    json.dump(data, file, indent=4)

print(f"Scraping complete. Data saved to {output_file}.")
