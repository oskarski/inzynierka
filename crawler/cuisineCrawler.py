import requests
from bs4 import BeautifulSoup
import psycopg2
from config import DB_CONFIG

def cuisine_crawler():
    # Define the base URL and type list
    base_url = "https://kuchnialidla.pl/przepisy/"
    type_list = ['kuchnia-amerykanska', 'kuchnia-azjatycka', 'kuchnia-czeska', 'kuchnia-francuska',
                 'kuchnia-grecka', 'kuchnia-hiszpanska-i-portugalska', 'kuchnia-polska', 'kuchnia-wloska',
                 'brytyjska', 'kuchnia-orientalna', 'kuchnia-alpejska', 'kuchnia-tajska', 'kuchnia-meksykanska']

    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()

    cursor.execute("CREATE TABLE IF NOT EXISTS crawler_recipeCuisine (id SERIAL PRIMARY KEY, link VARCHAR(255), cuisine VARCHAR(255))")

    # Loop through each type in the type list
    for recipe_cuisine in type_list:
        # Initialize the page number to 1
        page_num = 1

        # Loop through each page of the recipe listings
        while True:
            # Make a request to the URL for this type and page number
            url = f"{base_url}{recipe_cuisine}/{page_num}#lista"
            print(url)
            response = requests.get(url)
            response.raise_for_status()  # Check for HTTP errors

            # Parse the HTML content of the response using BeautifulSoup
            soup = BeautifulSoup(response.content, 'html.parser')

            # Find all div elements with class="recipe_box" and extract the href attribute of the a element
            recipe_boxes = soup.find_all('div', class_='recipe_box')
            for recipe_box in recipe_boxes:
                link = recipe_box.find('a')['href']

                # Save the href to the database
                sql = "INSERT INTO crawler_recipeCuisine (link, cuisine) VALUES (%s, %s)"
                val = (link, recipe_cuisine)
                cursor.execute(sql, val)
                conn.commit()

            # Check if there is a "nextPage" link and increment the page number
            next_page = soup.find("a", class_="nextPage")
            if next_page is not None:
                page_num += 1
            else:
                break

    # Close the database connection
    cursor.close()
    conn.close()

if __name__ == '__main__':
    cuisine_crawler()
