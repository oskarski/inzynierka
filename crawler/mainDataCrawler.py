import requests
from bs4 import BeautifulSoup
import psycopg2
from config import DB_CONFIG
import logging

# Ustawienie poziomu logowania
logging.basicConfig(level=logging.INFO)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:116.0) Gecko/20100101 Firefox/116.0"
}

base_url = "https://kuchnialidla.pl"
recipes_url = f"{base_url}/przepisy/"


def main_data_crawler():
    recipes = []

    n = 1

    while n <= 284:  # number of pages to crawl -
        try:
            response = requests.get(f"{recipes_url}{n}#lista", headers=headers)
            response.raise_for_status()  # Sprawdzenie, czy wystąpił błąd HTTP
            soup = BeautifulSoup(response.content, "html.parser")
        except requests.exceptions.RequestException as e:
            logging.error("Request failed: %s", e)
            soup = None
            break

        if soup:
            next_page = soup.find("a", class_="nextPage")

            if not next_page:
                break

            for recipe_card in soup.find_all("div", class_="recipe_box"):
                title_element = recipe_card.find("h4")
                title = title_element.text.strip() if title_element else "none"

                description_element = recipe_card.find(class_="ShortDescription")
                description = description_element.text.strip() if description_element else ""

                link_element = recipe_card.find("a")
                link = link_element["href"].strip() if link_element else ""

                image_element = recipe_card.find("img")
                image_link = image_element["data-src"].strip() if image_element else ""

                difficulty_element = recipe_card.find("span", title="poziom trudności")
                difficulty = difficulty_element.text.strip() if difficulty_element else ""

                time_element = recipe_card.find(class_="time")
                time = time_element.text.strip() if time_element else ""

                size_element = recipe_card.find(class_="size")
                size = size_element.text.strip() if size_element else ""

                wege_element = recipe_card.find(class_="wege inactive")
                wege = wege_element.text.strip() if wege_element else "true"

                recipes.append({
                    "title": title,
                    "description": description,
                    "link": link,
                    "image": image_link,
                    "difficulty": difficulty,
                    "time": time,
                    "size": size,
                    "wege": wege,
                })
        else:
            break

        n += 1
        logging.info("Processed page %d", n)

    if recipes:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**DB_CONFIG)

        # Create a cursor object
        cursor = conn.cursor()

        # Create a table to store the data
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS crawler_recipes (id SERIAL PRIMARY KEY, title VARCHAR(255), description TEXT, link VARCHAR(255), image VARCHAR(255), difficulty VARCHAR(255), time VARCHAR(255), size VARCHAR(255), wege VARCHAR(255))"
        )

        # Insert the data into the table, skipping duplicates
        for recipe in recipes:
            query = "SELECT id FROM crawler_recipes WHERE link = %s"
            values = (recipe["link"],)
            cursor.execute(query, values)
            result = cursor.fetchone()
            if result:
                logging.info(
                    "Skipping recipe '%s' because link '%s' already exists in the database",
                    recipe["title"],
                    recipe["link"],
                )
            else:
                query = "INSERT INTO crawler_recipes (title, description, link, image, difficulty, time, size, wege) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                values = (
                    recipe["title"],
                    recipe["description"],
                    recipe["link"],
                    recipe["image"],
                    recipe["difficulty"],
                    recipe["time"],
                    recipe["size"],
                    recipe["wege"],
                )
                cursor.execute(query, values)

        # Commit the changes to the database
        conn.commit()

        # Close the database connection
        conn.close()


if __name__ == "__main__":
    main_data_crawler()
