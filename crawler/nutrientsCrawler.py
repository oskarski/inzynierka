import requests
import pandas as pd
from bs4 import BeautifulSoup
import psycopg2


# Connect to the PostgreSQL database
db = psycopg2.connect(
    host="localhost",
    port=5432,
    user="postgres",
    password="admin",
    database="inzynierka"
)

# Create a cursor object
cursor = db.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS nutrients (id SERIAL PRIMARY KEY, recipe_id INT, whole_dish_energy VARCHAR(255), per_serving_energy TEXT, fat VARCHAR(255), carbs VARCHAR(255), fiber VARCHAR(255), protein VARCHAR(255))")

cursor.execute("SELECT link FROM recipes")
links = cursor.fetchall()

# Initialize recipe_id
recipe_id = 1

# Loop over each recipe link and scrape data
for link in links:
    url = 'https://kuchnialidla.pl/' + link[0]
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract the nutrient data and store it in Python variables
    nutrient_dict = {}
    nutrients = soup.find_all('tr')[1:] # ignore the first row which contains the header
    for nutrient in nutrients:
        nutrient_name, nutrient_value = nutrient.find_all('td')
        nutrient_dict[nutrient_name.text.strip()] = nutrient_value.text.strip()

    whole_dish_energy = nutrient_dict.get('Wartość energetyczna na całe danie', '-')
    per_serving_energy = nutrient_dict.get('Wartość energetyczna na 1 porcję', '-')
    fat = nutrient_dict.get('Tłuszcz', '-')
    carbs = nutrient_dict.get('Węglowodany', '-')
    fiber = nutrient_dict.get('Błonnik', '-')
    protein = nutrient_dict.get('Białko', '-')


    # Insert the nutrient data into the SQL database
    if whole_dish_energy is None:
        with db.cursor() as cursor:
            sql = f"INSERT INTO nutrients (recipe_id, whole_dish_energy, per_serving_energy, fat, carbs, fiber, protein) \
                VALUES ('{recipe_id}', '-', '-', '-', '-', '-', '-')"
            cursor.execute(sql)
            db.commit()
    else:
        with db.cursor() as cursor:
            sql = f"INSERT INTO nutrients (recipe_id, whole_dish_energy, per_serving_energy, fat, carbs, fiber, protein) \
                VALUES ('{recipe_id}', '{whole_dish_energy}', '{per_serving_energy}', '{fat}', '{carbs}', '{fiber}', '{protein}')"
            cursor.execute(sql)
            db.commit()

    # Increment recipe_id for next iteration
    recipe_id +=1

# Commit the changes to the database
db.commit()

# Close the database connection
db.close()
