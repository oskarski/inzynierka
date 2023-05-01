import {
  ICreateRecipeDto,
  IngredientId,
  IRecipeInstructionDto,
  ISaveRecipeIngredientDto,
  RecipeCategoryId,
} from '@lib/shared';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class RecipeInstructionDto implements IRecipeInstructionDto {
  @IsString()
  @IsNotEmpty()
  readonly step: string;
}

class SaveRecipeIngredientDto implements ISaveRecipeIngredientDto {
  @IsUUID()
  readonly id: IngredientId;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  readonly quantity: number;

  @IsString()
  @IsNotEmpty()
  readonly unit: string;
}

export class CreateRecipeDto implements ICreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  readonly preparationTime: number;

  @IsNumber()
  @IsPositive()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  readonly portions: number;

  @IsArray()
  @IsUUID(undefined, { each: true })
  readonly categoryIds: RecipeCategoryId[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RecipeInstructionDto)
  readonly instructions: RecipeInstructionDto[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SaveRecipeIngredientDto)
  readonly ingredients: SaveRecipeIngredientDto[];
}
