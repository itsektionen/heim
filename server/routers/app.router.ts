import { router } from "../trpc";
import { koppsRouter } from "./kopps.router";
export const appRouter = router({
  kopps: koppsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
