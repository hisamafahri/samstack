import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { AppRouter as ApiAppRouter, appRouter } from "./src/router";

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type AppRouter = ApiAppRouter;

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<ApiAppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<ApiAppRouter>;

/**
 * Export appRouter
 * @example
 **/
export const router = appRouter;
