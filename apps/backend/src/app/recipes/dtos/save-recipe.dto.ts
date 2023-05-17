import {
  IDraftRecipeDto,
  IDraftRecipeInstructionDto,
  IngredientId,
  IPublishRecipeDto,
  IRecipeInstructionDto,
  ISaveRecipeIngredientDto,
  RecipeCategoryId,
  RecipeDifficulty,
} from '@lib/shared';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

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

class DraftRecipeInstructionDto implements IDraftRecipeInstructionDto {
  @IsString()
  @IsOptional()
  readonly step?: string;
}

abstract class DraftRecipeDto implements IDraftRecipeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsEnum(RecipeDifficulty)
  @IsOptional()
  readonly difficulty?: RecipeDifficulty;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  readonly dietType?: RecipeCategoryId[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  readonly dishType?: RecipeCategoryId[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  readonly cuisineType?: RecipeCategoryId[];

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Transform(({ value }) =>
    value === undefined ? undefined : parseInt(value, 10),
  )
  readonly preparationTime?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Transform(({ value }) =>
    value === undefined ? undefined : parseInt(value, 10),
  )
  readonly portions?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DraftRecipeInstructionDto)
  readonly instructions?: DraftRecipeInstructionDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SaveRecipeIngredientDto)
  readonly ingredients?: SaveRecipeIngredientDto[];
}

export class CreateRecipeDto extends DraftRecipeDto {}

class RecipeInstructionDto implements IRecipeInstructionDto {
  @IsString()
  @IsNotEmpty()
  readonly step: string;
}

export class PublishRecipeDto implements IPublishRecipeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsEnum(RecipeDifficulty)
  readonly difficulty: RecipeDifficulty;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  readonly dietType?: RecipeCategoryId[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  readonly dishType?: RecipeCategoryId[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  readonly cuisineType?: RecipeCategoryId[];

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
