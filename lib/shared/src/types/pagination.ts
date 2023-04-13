export interface IPaginated<DtoType> {
  data: DtoType[];
  total: number;
}
