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

# insert new data into the recipes table
cur.execute("""
    INSERT INTO recipes (name, description, preparation_time, portions, instructions)
    SELECT title, description,
        (substring(time from 1 for 1)::INTEGER * 3600) + (substring(time from 3)::INTEGER * 60),
        CAST(size AS INTEGER), to_json(jsondescription)
    FROM crawler_recipes
    INNER JOIN crawler_recipeinstruction ON crawler_recipes.link = crawler_recipeinstruction.link
    WHERE trim(time) <> '' AND trim(size) <> ''
    AND NOT EXISTS (SELECT 1 FROM recipes WHERE name = title)
""")

# insert new data into the ingredients table
cur.execute("""
    INSERT INTO ingredients (name)
    SELECT DISTINCT regexp_replace(trim(name), '\s{2,}', ' ', 'g') AS name
    FROM crawler_ingredients
    WHERE name !~ '[0-9]' AND name !~ '[1-9][/][0-9]' AND name !~ '[^\s]*\u00BD[^\s]*'
        AND NOT EXISTS (SELECT 1 FROM ingredients WHERE name = regexp_replace(trim(crawler_ingredients.name), '\s{2,}', ' ', 'g'))
""")

# add column name to crawler_recipeType
cur.execute('''
ALTER TABLE crawler_recipeType ADD COLUMN IF NOT EXISTS name varchar(255);
UPDATE crawler_recipeType SET name = CASE
WHEN type = 'dania-glowne' THEN 'dania główne'
WHEN type = 'zupy' THEN 'zupy'
WHEN type = 'salatki' THEN 'sałatki'
WHEN type = 'napoje' THEN 'napoje'
WHEN type = 'przetwory' THEN 'przetwory'
WHEN type = 'sniadania' THEN 'śniadania'
WHEN type = 'fast-food' THEN 'fast-food'
WHEN type = 'przekaski-na-impreze' THEN 'przekąski'
WHEN type = 'desery' THEN 'desery'
WHEN type = 'ciastka' THEN 'ciastka'
WHEN type = 'ciasteczka' THEN 'ciasteczka'
END WHERE name IS NULL;
''')

# add column name to crawler_recipeCuisine
cur.execute('''
ALTER TABLE crawler_recipeCuisine ADD COLUMN IF NOT EXISTS name varchar(255);
UPDATE crawler_recipeCuisine SET name = CASE
WHEN cuisine = 'kuchnia-amerykanska' THEN 'dania amerykańska'
WHEN cuisine = 'kuchnia-azjatycka' THEN 'azjatycka'
WHEN cuisine = 'kuchnia-czeska' THEN 'czeska'
WHEN cuisine = 'kuchnia-francuska' THEN 'francuska'
WHEN cuisine = 'kuchnia-grecka' THEN 'grecka'
WHEN cuisine = 'kuchnia-hiszpanska-i-portugalska' THEN 'iberyjska'
WHEN cuisine = 'kuchnia-polska' THEN 'polska'
WHEN cuisine = 'kuchnia-wloska' THEN 'włoska'
WHEN cuisine = 'brytyjska' THEN 'brytyjska'
WHEN cuisine = 'kuchnia-orientalna' THEN 'orientala'
WHEN cuisine = 'kuchnia-alpejska' THEN 'alpejska'
WHEN cuisine = 'kuchnia-tajska' THEN 'tajska'
WHEN cuisine = 'kuchnia-meksykanska' THEN 'meksykańska'
END WHERE name IS NULL;
''')


#insert new data into the categories table - dish-type
cur.execute('''
INSERT INTO categories (name, type)
SELECT DISTINCT name, 'dish-type'::categories_type_enum
FROM crawler_recipeType
WHERE NOT EXISTS (
  SELECT 1
  FROM categories
  WHERE categories.name = crawler_recipeType.name
);
''')

#insert new data into the categories table - cuisine-type
cur.execute('''
INSERT INTO categories (name, type)
SELECT DISTINCT name, 'cuisine-type'::categories_type_enum
FROM crawler_recipeCuisine
WHERE NOT EXISTS (
  SELECT 1
  FROM categories
  WHERE categories.name = crawler_recipeCuisine.name
);
''')



#update crawler_ingredients with link
cur.execute('''
ALTER TABLE crawler_ingredients ADD COLUMN IF NOT EXISTS  link VARCHAR;
UPDATE crawler_ingredients AS ci SET link = cr.link
FROM crawler_recipes AS cr WHERE ci.recipe_id = cr.id;
''')

#update crawler_recipes with type of the dish

cur.execute('''
ALTER TABLE crawler_recipes
ADD COLUMN IF NOT EXISTS dish_type varchar(255);
UPDATE crawler_recipes SET dish_type = cr.name
FROM crawler_recipeType cr
WHERE crawler_recipes.link = cr.link;
''')

#update crawler_recipes with cuisine of the dish

cur.execute('''
ALTER TABLE crawler_recipes
ADD COLUMN IF NOT EXISTS cuisine_type varchar(255);
UPDATE crawler_recipes SET cuisine_type = cr.name
FROM crawler_recipeCuisine cr
WHERE crawler_recipes.link = cr.link;
''')

#insert new data into recipe_categories
cur.execute('''
INSERT INTO recipe_categories (recipe_id, category_id)
SELECT r.id, c.id FROM recipes r
JOIN crawler_recipes cr ON r.name = cr.title
JOIN crawler_recipeType crt ON cr.categoryName = crt.name
JOIN categories c ON crt.name = c.name
ON CONFLICT DO NOTHING;
''')

#insert data into recipe_ingredients

cur.execute('''
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
    SELECT DISTINCT r.id AS recipe_id, i.id AS ingredient_id,
        CASE WHEN ci.amount ~ '^-?[0-9]+([,.][0-9]+)?$'
            THEN REPLACE(ci.amount, ',', '.')::numeric
            ELSE REPLACE(ci.amount, '-', '0')::numeric END AS quantity,
       ci.unit AS unit
    FROM crawler_ingredients ci
    JOIN crawler_recipes cr ON ci.recipe_id = cr.id
    JOIN recipes r ON cr.title = r.name
    JOIN ingredients i ON ci.name = i.name
    WHERE ci.amount <> ''
      AND NOT EXISTS (
        SELECT 1 FROM recipe_ingredients WHERE recipe_id = r.id AND ingredient_id = i.id
      );
''')

# commit the changes to the database and close the cursor and connection
conn.commit()

cur.close()
conn.close()

