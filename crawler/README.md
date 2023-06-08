## Main script

```bash
$ run main.py python script
```

## Scripts description
```bash
$ mainDataCrawler.py - collects basic data for recipes
$ ingredientsCrawler.py - collects all ingredients for recipes
$ nutrientsCrawler.py - collects all NutrionValues for recipes (not used in project)
$ cuisineCrawler.py - collects all cusisne types of dish for recipes
$ typeCrawler.py - collects all types of dish for recipe
$ recipeInstructionsCrawler - collects intructions for all recipes in json format
$ db.py - clears and organizes tables for project 
```

## Instructions
```bash

Main table is recipes. Other tables are connected either through "recipe_id" or "link"
Scripts "crawler" collects raw data from website.
Script db.py edit tables for project and fill them with needed data
Script main.py runs mainDataCrawler, then parellelly othe scripts and finally db.py
```

