export interface IPaginated<DtoType> {
  data: DtoType[];
  total: number;
}

export interface IPaginationQueryDto {
  readonly page: number;
  readonly perPage: number;
}
