import { useMemo } from "react";
import Stack from "react-bootstrap/Stack";
import { startshipTableState } from "../../hooks/starships/useStarshipTable";

export function StarshipDisplay(): JSX.Element {
  const { links, seek } = startshipTableState();
  const relations = useMemo(
    () => ({ first: seek("first"), prev: seek("prev"), next: seek("next"), last: seek("last") }),
    [links]
  );
  return (
    <Stack>
      {Object.entries(relations).map(([k, v], idx) => (
        <div key={`${k}-${v ?? "none"}-${idx}`}>
          {k}: {v ?? "none"}
        </div>
      ))}
    </Stack>
  );
}
