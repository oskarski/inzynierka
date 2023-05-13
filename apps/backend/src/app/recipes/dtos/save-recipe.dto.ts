import {
  ICreateRecipeDto,
  ICreateRecipeInstructionDto,
  IngredientId,
  IPublishRecipeDto,
  IPublishRecipeInstructionDto,
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

class CreateRecipeInstructionDto implements ICreateRecipeInstructionDto {
  @IsString()
  @IsOptional()
  readonly step?: string;
}

export class CreateRecipeDto implements ICreateRecipeDto {
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
  @IsUUID(undefined, { each: true })
  readonly categoryIds?: RecipeCategoryId[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeInstructionDto)
  readonly instructions?: CreateRecipeInstructionDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SaveRecipeIngredientDto)
  readonly ingredients?: SaveRecipeIngredientDto[];
}

class PublishRecipeInstructionDto implements IPublishRecipeInstructionDto {
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
  @Type(() => PublishRecipeInstructionDto)
  readonly instructions: PublishRecipeInstructionDto[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SaveRecipeIngredientDto)
  readonly ingredients: SaveRecipeIngredientDto[];
}
