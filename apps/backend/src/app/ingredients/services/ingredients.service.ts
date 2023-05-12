import { Injectable } from '@nestjs/common';
import { IIngredientListItemDto, IListIngredientsDto } from '@lib/shared';
import { IngredientsRepository } from '../repositories';
import { Pagination } from '../../utils';

@Injectable()
export class IngredientsService {
  constructor(private readonly ingredientsRepository: IngredientsRepository) {}

  findIngredients(
    searchDto: IListIngredientsDto,
  ): Promise<IIngredientListItemDto[]> {
    if (!searchDto.name)
      return this.ingredientsRepository.findMostPopular(
        Pagination.firstPage(5),
      );

    return this.ingredientsRepository.findByName(
      searchDto.name,
      Pagination.firstPage(5),
    );
  }
}
