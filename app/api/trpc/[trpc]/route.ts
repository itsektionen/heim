import { appRouter } from "@/server/routers/app.router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: (opts) => {
      const { error } = opts;
      console.error("Error:", error);
    },
  });
};

export { handler as GET, handler as POST };
