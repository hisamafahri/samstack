import { createNextApiHandler } from "@trpc/server/adapters/next";
import { router } from "@samstack/api";
import { createTRPCContext } from "@samstack/api/src/trpc";

export default createNextApiHandler({
  router,
  createContext: createTRPCContext,
});

// NOTE: If you need to enable cors, you can do so like this:
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Enable cors
//   await cors(req, res);

//   // Let the tRPC handler do its magic
//   return createNextApiHandler({
//     router: appRouter,
//     createContext,
//   })(req, res);
// };

// export default handler;
