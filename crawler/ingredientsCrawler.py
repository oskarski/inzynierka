import requests
import pandas as pd
from bs4 import BeautifulSoup
import psycopg2
import re

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    user="root",
    password="root",
    database="inzynierka"
)

# Create a cursor object
cursor = conn.cursor()

cursor.execute("DROP TABLE IF EXISTS crawler_ingredients")
cursor.execute("CREATE TABLE IF NOT EXISTS crawler_ingredients (id SERIAL PRIMARY KEY, recipe_id INT, name VARCHAR(255), amount VARCHAR(255), unit VARCHAR(255))")

cursor.execute("SELECT link FROM crawler_recipes")
links = cursor.fetchall()

# Initialize recipe_id
recipe_id = 1

for link in links:
    url = 'https://kuchnialidla.pl/' + link[0]
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    sql_insert_ingredient = "INSERT INTO crawler_ingredients (recipe_id, name, amount, unit) VALUES (%s, %s, %s, %s)"

    # Extract ingredients and insert into database
    skladniki_div = soup.find('div', class_='skladniki')
    if skladniki_div is not None:
        ul = skladniki_div.find('ul')
        if ul is not None:
            ingredients_list = ul.find_all('li')
            for ingredient in ingredients_list:
                name, amount, unit = '', '', ''
                name_and_amount = re.split('[-–:]', ingredient.text.strip(), maxsplit=1)
                name = name_and_amount[0].strip()
                if len(name_and_amount) > 1:
                    amount_unit = name_and_amount[1].strip()
                    match = re.match(r'^(\d+(?:[\.,]\d+)?)(.*?)$', amount_unit)
                    if match:
                        amount = match.group(1)
                        unit = match.group(2).strip()
                ingredient_data = (recipe_id, name, amount, unit)
                cursor.execute(sql_insert_ingredient, ingredient_data)
                conn.commit()
        else:
            # Insert a special record to indicate an empty recipe
            ingredient_data = (recipe_id, '-', '-', '-')
            cursor.execute(sql_insert_ingredient, ingredient_data)
            conn.commit()
    else:
        # Insert a special record to indicate an empty recipe
        ingredient_data = (recipe_id, '-', '-', '-')
        cursor.execute(sql_insert_ingredient, ingredient_data)
        conn.commit()

    # Increment recipe_id for next iteration
    recipe_id +=1


# Commit the changes to the database
conn.commit()

# Close the database connection
conn.close()
