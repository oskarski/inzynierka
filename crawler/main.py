import multiprocessing
from mainDataCrawler import main_data_crawler
from ingredientsCrawler import ingredients_crawler
from recipeInstructionCrawler import recipe_instruction_crawler
from typeCrawler import type_crawler
from cuisineCrawler import cuisine_crawler
from db import cleanup_tables

if __name__ == '__main__':
    # Uruchomienie głównego crawlera jako pierwszy
    main_process = multiprocessing.Process(target=main_data_crawler)
    main_process.start()
    main_process.join()

    # Pozostałe crawlery uruchomione równolegle
    crawler_processes = [
        multiprocessing.Process(target=ingredients_crawler),
        multiprocessing.Process(target=recipe_instruction_crawler),
        multiprocessing.Process(target=type_crawler),
        multiprocessing.Process(target=cuisine_crawler)
    ]

    for crawler_process in crawler_processes:
        crawler_process.start()

    for crawler_process in crawler_processes:
        crawler_process.join()

    # Ostateczne porządki w tabelach
    cleanup_tables()