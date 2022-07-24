import { config } from "../../utils/config";
import { usePaginatedTable } from "../useTable";

export const startshipTableState = usePaginatedTable(config.canonicalUrl.concat(config.starshipEndpoint));
