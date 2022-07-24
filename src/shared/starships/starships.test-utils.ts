import { v4 } from "uuid";
import generate from "project-name-generator";
import { Starship } from "./starships.models";

function stubStarship(partial?: Partial<Starship>): Starship {
  return {
    id: v4(),
    active: true,
    model: generate({ words: 2 }).dashed,
    name: generate({ words: 1 }).spaced,
    ...partial,
  };
}

export function* startship(amount?: number) {
  let count = 0;
  while (amount ? count < amount : true) {
    yield stubStarship();
    count++;
  }
}
