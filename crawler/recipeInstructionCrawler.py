import requests
from bs4 import BeautifulSoup
import psycopg2
import json
import re
import logging
from config import DB_CONFIG

# Ustawienie poziomu logowania
logging.basicConfig(level=logging.INFO)

def recipe_instruction_crawler():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**DB_CONFIG)

    # Create a cursor object
    cursor = conn.cursor()

    # Create the recipedescription table if it does not exist
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS crawler_recipeInstruction (id SERIAL PRIMARY KEY, link VARCHAR(255), jsonDescription jsonb)"
    )

    # Select all recipe links from the recipes table
    cursor.execute("SELECT link FROM crawler_recipes")
    links = cursor.fetchall()

    # Loop over each recipe link and scrape data
    for link in links:
        url = "https://kuchnialidla.pl/" + link[0]
        try:
            response = requests.get(url)
            response.raise_for_status()  # Sprawdzenie, czy wystąpił błąd HTTP
            soup = BeautifulSoup(response.text, "html.parser")
        except requests.exceptions.RequestException as e:
            logging.error("Request failed for link '%s': %s", link[0], e)
            continue

        logging.info("Processing link: %s", url)

        # Find the recipe description and save it to the database
        description_div = soup.find("div", {"class": "article", "id": "opis"})
        if description_div:
            result = {"Sposób przygotowania": ""}
            steps = []

            step_num = 1

            for tag in description_div.children:
                if (
                    tag.name == "h2"
                    and ("Sposób przygotowania:" in tag.text or "Sposób przygotowania:" in tag.text)
                ):
                    result["Sposób przygotowania"] = tag.text
                elif (
                    tag.name == "h2"
                    and ("KROK" in tag.text or "Krok" in tag.text)
                ):
                    try:
                        step_desc = ""
                        next_tag = tag.find_next_sibling()
                        while next_tag and next_tag.name != "h2":
                            if next_tag.name == "p":
                                # Remove any text between angle brackets
                                step_desc += re.sub(r"<[^>]+>", "", str(next_tag))
                            next_tag = next_tag.find_next_sibling()
                        steps.append({"step": step_desc.strip()})
                        step_num += 1
                    except AttributeError:
                        continue

            result.update({"Kroki": steps})

            json_output = json.dumps(result, ensure_ascii=False, indent=4)
            insert_query = "INSERT INTO crawler_recipeInstruction (link, jsonDescription) VALUES (%s, %s)"
            insert_values = (link[0], json_output)
            cursor.execute(insert_query, insert_values)

            # Commit the changes to the database
            conn.commit()

    # Close the cursor and database connection
    cursor.close()
    conn.close()


if __name__ == "__main__":
    recipe_instruction_crawler()
