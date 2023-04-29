import psycopg2

# establish a connection to the database
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    user="root",
    password="root",
    database="inzynierka"
)

# create a cursor object to execute SQL statements
cur = conn.cursor()

#cur.execute("TRUNCATE TABLE recipes CASCADE")
#cur.execute("TRUNCATE TABLE ingredients CASCADE")

# insert new data into the recipes table
cur.execute("INSERT INTO recipes (name, description, preparation_time, portions, instructions) SELECT title, description, (substring(time from 1 for 1)::INTEGER * 3600) + (substring(time from 3)::INTEGER * 60), CAST(size AS INTEGER), to_json(jsondescription) FROM crawler_recipes INNER JOIN crawler_recipeinstruction ON crawler_recipes.link = crawler_recipeinstruction.link WHERE trim(time) <> '' AND trim(size) <> '' ON CONFLICT DO NOTHING")

# insert new data into the ingredients table
cur.execute("INSERT INTO ingredients (name) SELECT DISTINCT regexp_replace(trim(name), '\s{2,}', ' ', 'g') AS name FROM crawler_ingredients WHERE name !~ '[0-9]' AND name !~ '[1-9][/][0-9]' AND name !~ '[^\s]*\u00BD[^\s]*' ON CONFLICT DO NOTHING")

# add column name to crawler_recipes
cur.execute("ALTER TABLE crawler_recipeType ADD COLUMN name varchar(255); UPDATE crawler_recipeType SET name = CASE WHEN type = 'dania-glowne' THEN 'dania główne' WHEN type = 'zupy' THEN 'zupy' WHEN type = 'salatki' THEN 'sałatki' WHEN type = 'napoje' THEN 'napoje' WHEN type = 'przetwory' THEN 'przetwory' WHEN type = 'sniadania' THEN 'śniadania' WHEN type = 'fast-food' THEN 'fast-food' WHEN type = 'przekaski-na-impreze' THEN 'przekąski' WHEN type = 'desery' THEN 'desery' WHEN type = 'ciastka' THEN 'ciastka' WHEN type = 'ciasteczka' THEN 'ciasteczka' END;")

#insert new data into the recipe_category table
cur.execute("INSERT INTO recipe_category (name) SELECT name FROM crawler_recipeType;")

# commit the changes to the database and close the cursor and connection
conn.commit()
cur.close()
conn.close()

