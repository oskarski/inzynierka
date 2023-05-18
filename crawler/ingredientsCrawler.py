import requests
import pandas as pd
from bs4 import BeautifulSoup
import psycopg2
import re

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="iacstack-inzynierkadbinstanced4782ce1-hedjbq3rrafm.criw09kq67ql.eu-north-1.rds.amazonaws.com",
    port=5432,
    user="postgres",
    password="xovjaHba1iNoG^C92mI5_7wV5-Hmjv",
    database="inzynierka"
)

# Create a cursor object
cursor = conn.cursor()

cursor.execute("DROP TABLE IF EXISTS crawler_ingredients")
cursor.execute("CREATE TABLE IF NOT EXISTS crawler_ingredients (id SERIAL PRIMARY KEY, recipe_id INT, link VARCHAR(255), name VARCHAR(255), amount VARCHAR(255), unit VARCHAR(255))")

cursor.execute("SELECT link FROM crawler_recipes")
links = cursor.fetchall()

# Initialize recipe_id
recipe_id = 1

for link in links:

    print("Processing link:", link[0])

    url = 'https://kuchnialidla.pl/' + link[0]
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    sql_insert_ingredient = "INSERT INTO crawler_ingredients (recipe_id, link, name, amount, unit) VALUES (%s, %s, %s, %s, %s)"

    # Extract ingredients and insert into database
    skladniki_div = soup.find('div', class_='skladniki')
    if skladniki_div is not None:
        ingredient_data_list = []
        for ul in skladniki_div.find_all('ul'):
            for ingredient in ul.find_all('li'):
                name, amount, unit = '', '', ''
                name_and_amount = re.split('[-–:]', ingredient.text.strip(), maxsplit=1)
                name = name_and_amount[0].strip()
                if len(name_and_amount) > 1:
                    amount_unit = name_and_amount[1].strip()
                    match = re.match(r'^(\d+(?:[\.,]\d+)?)(.*?)$', amount_unit)
                    if match:
                        amount = match.group(1)
                        unit = match.group(2).strip()
                ingredient_data = (recipe_id, link[0], name, amount, unit)
                ingredient_data_list.append(ingredient_data)
        if not ingredient_data_list:
            # Insert a special record to indicate an empty recipe
            ingredient_data_list.append((recipe_id, link[0], '-', '-', '-'))
        cursor.executemany(sql_insert_ingredient, ingredient_data_list)
        conn.commit()
    else:
        # Insert a special record to indicate an empty recipe
        ingredient_data = (recipe_id, link[0], '-', '-', '-')
        cursor.execute(sql_insert_ingredient, ingredient_data)
        conn.commit()


    # Increment recipe_id for next iteration
    recipe_id +=1


# Commit the changes to the database
conn.commit()

# Close the database connection
conn.close()
