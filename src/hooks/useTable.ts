import Link from "http-link-header";
import create from "zustand";
import { constants } from "../utils/constants";

const rels = ["first", "prev", "next", "last"] as const;
type LinkRelation = typeof rels[number];

export interface PaginatedTableState {
  uri: string;
  page: number;
  input: string;
  search: string;
  links?: string;
  seek(value: LinkRelation): string | undefined;
}

function createUsePaginatedTableHook(
  url: string,
  initialPage: number = constants.FIRST_PAGE,
  pageSize: number = constants.PAGE_SIZE
) {
  return create<PaginatedTableState>((_, get) => ({
    input: constants.EMPTY_STRING,
    search: constants.EMPTY_STRING,
    page: initialPage,
    pageSize,
    uri: `${url}?page=${initialPage}&perPage=${pageSize}`,
    seek(value) {
      return new Link(get().links ?? "").get("rel", value).at(0)?.uri;
    },
  }));
}

export function usePaginatedTable(url: string) {
  return createUsePaginatedTableHook(url);
}
