import { SyntheticEvent } from "react";
import Pagination from "react-bootstrap/Pagination";

interface PaginateProps {
  currentPage: number;
  next: string | undefined;
  prev: string | undefined;
  first: string | undefined;
  last: string | undefined;
  onClick(event: SyntheticEvent, uri: string): void;
}

export function Paginate({ first, last, next, prev, onClick, currentPage }: PaginateProps): JSX.Element {
  return (
    <Pagination className="d-flex flex-row justify-content-center">
      {first && <Pagination.First onClick={(e) => onClick(e, first)} />}
      {prev ? <Pagination.Prev onClick={(e) => onClick(e, prev)} /> : <Pagination.Ellipsis />}
      <Pagination.Item>{currentPage}</Pagination.Item>
      {next ? <Pagination.Next onClick={(e) => onClick(e, next)} /> : <Pagination.Ellipsis />}
      {last && <Pagination.Last onClick={(e) => onClick(e, last)} />}
    </Pagination>
  );
}
