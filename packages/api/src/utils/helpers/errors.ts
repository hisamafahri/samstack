import { TRPCError } from "@trpc/server";
import { DrizzleError } from "drizzle-orm";
import { LuciaError } from "lucia-auth";

export const handleTRPCError = (error: unknown) => {
  // NOTE: handle all error inside a tRPC procedure here
  if (error instanceof LuciaError) {
    if (error.message === "AUTH_INVALID_PASSWORD") {
      throw new TRPCError({ code: "BAD_REQUEST", message: error.message });
    }
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: error.message,
    });
  }

  if (error instanceof DrizzleError) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Error: " + (error as any).toString(),
  });
};
