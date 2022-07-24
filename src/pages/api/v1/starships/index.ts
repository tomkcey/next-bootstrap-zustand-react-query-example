import { constants } from "http2";
import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "../../../../utils/validate";
import { z } from "zod";
import { LinkBuilder } from "../../../../utils/links";
import { config } from "../../../../utils/config";
import { startship } from "../../../../shared/starships/starships.test-utils";

const starships = [...startship(20)];

const zNumeric = z.string().regex(/^\d+$/);
const zPaginationQuery = z.object({
  page: zNumeric,
  perPage: zNumeric,
});
const zSearchQuery = z.object({ search: z.string().optional() });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const input = validate(req.query, zPaginationQuery.merge(zSearchQuery));
  const targetStarships = input.search
    ? starships.filter(
        (s) =>
          s.model
            .trim()
            .toLowerCase()
            .includes(input.search as string) ||
          s.name
            .trim()
            .toLowerCase()
            .includes(input.search as string)
      )
    : starships;
  const current = parseInt(input.page);
  const per = parseInt(input.perPage);
  const start = (current - 1) * per;
  const end = start + per;
  const result = targetStarships.slice(start, end).filter(isNotNil);
  const headers = new LinkBuilder(
    config.canonicalUrl.concat(config.starshipEndpoint),
    targetStarships.length,
    current,
    per
  ).create();
  res.setHeader("link", headers);
  res.status(constants.HTTP_STATUS_OK).json(result);
}

function isNotNil<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null;
}
