import {
  createCallerFactory,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { greeting } from "./routers/greeting";
import { project } from "./routers/project";
import { dummy } from "./routers/dummy";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  health: greeting,
  database: project,
  dummy: dummy,
  token: protectedProcedure.query(({ ctx }) => {
    return ctx.db.session.findFirst({
      select: {
        sessionToken: true,
      },
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
