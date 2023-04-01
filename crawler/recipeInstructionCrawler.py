import requests
import pandas as pd
from bs4 import BeautifulSoup
import psycopg2
import json

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    user="postgres",
    password="admin",
    database="inzynierka"
)

# Create a cursor object
cursor = conn.cursor()

# Create the recipedescription table if it does not exist
cursor.execute("CREATE TABLE IF NOT EXISTS recipeInstruction (id SERIAL PRIMARY KEY, link VARCHAR(255), jsonDescription TEXT)")

# Select all recipe links from the recipes table
cursor.execute("SELECT link FROM recipes")
links = cursor.fetchall()

# Loop over each recipe link and scrape data
for link in links:
    url = 'https://kuchnialidla.pl/' + link[0]
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    print(url)

    # Find the recipe description and save it to the database
    description_div = soup.find('div', {'class': 'article', 'id': 'opis'})
    if description_div:
        result = {'Sposób przygotowania': ''}
        steps = []

        step_num = 1

        for tag in description_div.children:
            if tag.name == 'h2' and tag.text == 'Sposób przygotowania:':
                result['Sposób przygotowania'] = tag.text
            elif tag.name == 'h2' and 'KROK' in tag.text:

                step_desc = tag.find_next_sibling('p').text
                steps.append({'KROK ' + str(step_num): step_desc})

                step_num+=1

        result.update({'Kroki': steps})

        json_output = json.dumps(result, ensure_ascii=False, indent=4)
        insert_query = "INSERT INTO recipeInstruction (link, jsonDescription) VALUES (%s, %s)"
        insert_values = (link[0], json_output)
        cursor.execute(insert_query, insert_values)

        # Commit the changes to the database
        conn.commit()

# Close the cursor and database connection
cursor.close()
conn.close()
