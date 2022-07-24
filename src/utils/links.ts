import Link from "http-link-header";

export class LinkBuilder {
  constructor(
    private url: string,
    private total: number,
    private currentPage: number,
    private pageSize: number,
    private link: Link = new Link()
  ) {}
  private hasNext() {
    return this.currentPage + 1 <= this.total / this.pageSize;
  }
  private hasPrev() {
    return this.currentPage - 1 > 0;
  }
  private first(): LinkBuilder {
    this.link.set({
      rel: "first",
      uri: this.url.concat(`?page=${1}&perPage=${this.pageSize}`),
    });
    return this;
  }
  private last(): LinkBuilder {
    this.link.set({
      rel: "last",
      uri: this.url.concat(`?page=${Math.ceil(this.total / this.pageSize) || 1}&perPage=${this.pageSize}`),
    });
    return this;
  }
  private next(): LinkBuilder {
    if (this.hasNext()) {
      this.link.set({
        rel: "next",
        uri: this.url.concat(`?page=${this.currentPage + 1}&perPage=${this.pageSize}`),
      });
    }
    return this;
  }
  private prev(): LinkBuilder {
    if (this.hasPrev()) {
      this.link.set({
        rel: "prev",
        uri: this.url.concat(`?page=${this.currentPage - 1}&perPage=${this.pageSize}`),
      });
    }
    return this;
  }
  public create(): string {
    this.first().prev().next().last();
    return this.link.toString();
  }
}
