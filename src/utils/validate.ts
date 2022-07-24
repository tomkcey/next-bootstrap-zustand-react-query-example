import { ZodError, ZodSchema } from "zod";
import { constants } from "./constants";
import { ErrorDetail, InvalidArgumentError } from "./errors";

export function validate<T>(x: unknown, schema: ZodSchema<T>): T {
  const result = schema.safeParse(x);
  if (result.success) {
    return result.data;
  }
  throw new InvalidArgumentError(mapToInvalidArg(result.error));
}

function mapToInvalidArg(error: ZodError): ErrorDetail {
  return error.issues.reduce((acc, cur) => {
    const key = cur.path.at(0) ?? constants.DEFAULT_ERROR_KEY;
    return { ...acc, [key]: cur.code };
  }, {});
}
