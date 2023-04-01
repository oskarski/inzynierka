import requests
from bs4 import BeautifulSoup
import psycopg2

# Define the base URL and type list
base_url = "https://kuchnialidla.pl/przepisy/"
type_list = ['kuchnia-amerykanska','kuchnia-azjatycka','kuchnia-czeska','kuchnia-francuska','kuchnia-grecka','kuchnia-hiszpanska-i-portugalska','kuchnia-polska','kuchnia-wloska','brytyjska','kuchnia-orientalna','kuchnia-alpejska','kuchnia-tajska','kuchnia-meksykanska', 'kuchnia-meksykanska']

# Connect to the PostgreSQL database
db = psycopg2.connect(
    host="localhost",
    port=5432,
    user="postgres",
    password="admin",
    database="inzynierka"
)
cursor = db.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS recipieCusine (id SERIAL PRIMARY KEY, link VARCHAR(255), cusine VARCHAR(255))")


# Loop through each type in the type list
for recipe_cusine in type_list:
    # Initialize the page number to 1
    page_num = 1

    # Loop through each page of the recipe listings
    while True:
        # Make a request to the URL for this type and page number
        url = base_url + recipe_cusine + "/" + str(page_num) + "#lista"
        print(url)
        response = requests.get(url)

        # Parse the HTML content of the response using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all div elements with class="recipe_box" and extract the href attribute of the a element
        recipe_boxes = soup.find_all('div', class_='recipe_box')
        for recipe_box in recipe_boxes:
            link = recipe_box.find('a')['href']

            # Save the href to the database
            sql = "INSERT INTO recipieCusine (link, cusine) VALUES (%s, %s)"
            val = (link,recipe_cusine)
            cursor.execute(sql, val)
            db.commit()

        # Check if there is a "nextPage" link and increment the page number
        next_page = soup.find("a", class_="nextPage")
        if next_page is not None:
            page_num += 1
        else:
            break

# Close the database connection
db.close()
