import { isBoolean } from "lodash";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import BootstrapTable from "react-bootstrap/Table";
import { constants } from "../utils/constants";

function isValidHtmlContent(x: unknown): x is string | number | boolean {
  return isString(x) || isNumber(x) || isBoolean(x);
}

interface TableProps<T extends Record<string, unknown> = Record<string, any>> {
  list: T[];
}

export function Table({ list }: TableProps): JSX.Element {
  const headers = Object.keys(list.at(0) ?? {});
  const data = list.map<(string | number | boolean)[]>((item) => Object.values(item).filter(isValidHtmlContent));

  return (
    <BootstrapTable striped hover>
      <TableHeader headers={headers} />
      <TableBody list={data} />
    </BootstrapTable>
  );
}

interface TableHeaderProps {
  headers: string[];
}

function TableHeader({ headers }: TableHeaderProps): JSX.Element {
  return (
    <thead>
      <tr>
        {headers.map((h, idx) => (
          <th key={`table-header-${idx}`}>{h}</th>
        ))}
      </tr>
    </thead>
  );
}

interface TableBodyProps<T = unknown> {
  list: T[][];
}

function TableBody({ list }: TableBodyProps): JSX.Element {
  return (
    <tbody>
      {list.map((rows, idx) => (
        <TableRow key={`table-row-${idx}`} rows={rows}></TableRow>
      ))}
    </tbody>
  );
}

interface TableRowProps<T = unknown> {
  rows: T[];
}

function TableRow({ rows }: TableRowProps): JSX.Element {
  return (
    <tr>
      {rows.map((v, idx, data) => (
        <td key={`table-data-${data[0]}-${idx}`}>
          {isValidHtmlContent(v) ? v.toString() : constants.UNSUPPORTED_DATA}
        </td>
      ))}
    </tr>
  );
}
