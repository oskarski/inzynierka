import requests
from bs4 import BeautifulSoup
import psycopg2

# Define the base URL and type list
base_url = "https://kuchnialidla.pl/przepisy/"
type_list = ['dania-glowne', 'zupy', 'salatki', 'napoje', 'przetwory', 'sniadania', 'fast-food', 'przekaski-na-impreze', 'desery', 'ciastka', 'ciasteczka']

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    user="root",
    password="root",
    database="inzynierka"
)
cur = conn.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS recipeType (id SERIAL PRIMARY KEY, link VARCHAR(255), type VARCHAR(255))")

# Loop through each type in the type list
for recipe_type in type_list:
    # Initialize the page number to 1
    page_num = 1

    # Loop through each page of the recipe listings
    while True:
        # Make a request to the URL for this type and page number
        url = base_url + recipe_type + "/" + str(page_num) + "#lista"
        print(url)
        response = requests.get(url)

        # Parse the HTML content of the response using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all div elements with class="recipe_box" and extract the href attribute of the a element
        recipe_boxes = soup.find_all('div', class_='recipe_box')
        for recipe_box in recipe_boxes:
            link = recipe_box.find('a')['href']

            # Save the href to the database
            sql = "INSERT INTO recipeType (link, type) VALUES (%s, %s)"
            val = (link, recipe_type)
            cur.execute(sql, val)
            conn.commit()

        # Check if there is a "nextPage" link and increment the page number
        next_page = soup.find("a", class_="nextPage")
        if next_page is not None:
            page_num += 1
        else:
            break

# Close the database connection
conn.close()