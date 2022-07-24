import { isNil } from "lodash";

export const config = {
  canonicalUrl: assertEnvironmentVariable(process.env.NEXT_PUBLIC_CANONICAL_URI),
  starshipEndpoint: assertEnvironmentVariable(process.env.NEXT_PUBLIC_STARSHIP_ENDPOINT),
} as const;

function assertEnvironmentVariable(value: string | undefined): string {
  if (isNil(value)) {
    throw new Error(`Environment variable must be supplied.`);
  }
  return value;
}
