import { IListIngredientsDto } from '@lib/shared';
import { IsString } from 'class-validator';

export class ListIngredientsDto implements IListIngredientsDto {
  @IsString()
  readonly name: string;
}
