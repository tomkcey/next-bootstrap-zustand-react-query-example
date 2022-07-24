import { ZodIssueCode } from "zod";

export enum ErrorMessage {
  InvalidArgument = "Sorry, provided argument is invalid.",
}

export type ErrorDetail = Record<string, ZodIssueCode>;

export class InvalidArgumentError<T = ErrorDetail> extends Error {
  constructor(public arg: T, public message: string = ErrorMessage.InvalidArgument) {
    super();
  }
}
