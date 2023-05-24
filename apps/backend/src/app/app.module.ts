import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import authConfig from './config/auth.config';
import { RecipeCategoriesModule } from './recipe-categories';
import { IngredientsModule } from './ingredients';
import { AuthModule } from './auth';
import { RecipesModule } from './recipes';
import { IamModule } from './iam';
import { ShoppingListModule } from './shopping-list';
import { ReviewsModules } from './reviews';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, authConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: false,
        host: configService.get('database').host,
        port: configService.get('database').port,
        username: configService.get('database').username,
        password: configService.get('database').password,
        database: configService.get('database').name,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RecipeCategoriesModule,
    IngredientsModule,
    RecipesModule,
    ShoppingListModule,
    ReviewsModules,
    IamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
