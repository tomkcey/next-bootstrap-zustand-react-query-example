import { SyntheticEvent, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { Paginate } from "../../components/Paginate";
import { Search } from "../../components/Search";
import { Table } from "../../components/Table";
import { queryClient } from "../../utils/http";
import { Starship } from "../../shared/starships/starships.models";
import { startshipTableState } from "../../hooks/starships/useStarshipTable";
import { constants } from "../../utils/constants";

export function StarshipTable(): JSX.Element {
  const { links, seek, uri, page, search } = startshipTableState();
  const { data } = useQuery([uri, search], () =>
    queryClient.call<Starship[]>(uri.concat(`&search=${search ?? constants.EMPTY_STRING}`), { method: "GET" })
  );
  const paginationUris = useMemo(
    () => ({ next: seek("next"), prev: seek("prev"), first: seek("first"), last: seek("last") }),
    [links]
  );

  useEffect(() => {
    startshipTableState.setState({ links: data?.headers.link });
  }, [data]);

  function handleSearchClick(event: SyntheticEvent, input: string) {
    event.preventDefault();
    void startshipTableState.setState((state) => ({ ...state, search: input }));
  }

  function handlePaginationButtonClick(event: SyntheticEvent, uri: string) {
    event.preventDefault();
    startshipTableState.setState((state) => ({ ...state, uri }));
    const serializedPageNumber = uri
      .substring(uri.search(/(page=)[0-9]/))
      .split(/&/)[0]
      .split(/=/)[1];
    startshipTableState.setState((state) => ({ ...state, page: parseInt(serializedPageNumber) }));
  }

  return (
    <>
      <Search onClick={handleSearchClick} />
      <Table list={data?.unwrap() ?? []} />
      <Paginate {...paginationUris} currentPage={page} onClick={handlePaginationButtonClick} />
    </>
  );
}
