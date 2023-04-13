import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../../app/ingredients/entities';
import { IngredientsModule } from '../../app/ingredients';
import { IngredientsController } from '../../app/ingredients/ingredients.controller';
import { Repository } from 'typeorm';
import { Recipe } from '../../app/recipes/entities';
import { RecipesController } from '../../app/recipes/recipes.controller';
import { RecipesModule } from '../../app/recipes';

export class TestContext {
  private __moduleFixture: TestingModule | undefined;
  private __app: INestApplication | undefined;

  private get moduleFixture(): TestingModule {
    if (!this.__moduleFixture) throw new Error('Call "startAppBeforeAll()"!');

    return this.__moduleFixture;
  }

  private get app(): INestApplication {
    if (!this.__app) throw new Error('Call "startAppBeforeAll()"!');

    return this.__app;
  }

  startAppBeforeAll(): this {
    beforeAll(async () => {
      this.__moduleFixture = await Test.createTestingModule({
        imports: [
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'inzynierka_test',
            entities: [Ingredient, Recipe],
            synchronize: true,
            migrationsRun: true,
            migrations: [__dirname + '/../migrations/*.ts'],
          }),
          IngredientsModule,
          RecipesModule,
        ],
      }).compile();

      this.__app = this.moduleFixture.createNestApplication();

      await this.app.init();
    });

    return this;
  }

  closeAppAfterAll(): this {
    afterAll(async () => {
      await this.app.close();
    });

    return this;
  }

  get controllers() {
    return {
      ingredientController: this.moduleFixture.get<IngredientsController>(
        IngredientsController,
      ),
      recipeController:
        this.moduleFixture.get<RecipesController>(RecipesController),
    };
  }

  get repositories() {
    return {
      ingredientRepository: this.moduleFixture.get<Repository<Ingredient>>(
        getRepositoryToken(Ingredient),
      ),
      recipeRepository: this.moduleFixture.get<Repository<Recipe>>(
        getRepositoryToken(Recipe),
      ),
    };
  }
}
