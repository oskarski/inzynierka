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

# execute SQL statements to create the new table and populate it
cur.execute("DROP TABLE IF EXISTS recipes")

cur.execute("CREATE TABLE recipes (id SERIAL PRIMARY KEY, name VARCHAR(255), description TEXT, preparation_time INTEGER, portions INTEGER, instructions JSONB)")

cur.execute("INSERT INTO recipes (name, description, preparation_time, portions, instructions) SELECT title, description, (substring(time from 1 for 1)::INTEGER * 3600) + (substring(time from 3)::INTEGER * 60), CAST(size AS INTEGER), to_json(jsondescription) FROM crawler_recipes INNER JOIN crawler_recipeinstruction ON crawler_recipes.link = crawler_recipeinstruction.link WHERE trim(time) <> '' AND trim(size) <> ''")

# commit the changes to the database and close the cursor and connection
conn.commit()
cur.close()
conn.close()
