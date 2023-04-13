export class Pagination {
  readonly skip: number;
  readonly take: number;

  private constructor(
    private readonly page: number,
    private readonly perPage: number,
  ) {
    this.skip = page * perPage;
    this.take = perPage;
  }

  static firstPage(perPage: number): Pagination {
    return new Pagination(0, perPage);
  }

  static page(page: number, perPage: number): Pagination {
    return new Pagination(page, perPage);
  }
}
