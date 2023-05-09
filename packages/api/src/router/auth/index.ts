import { z } from "zod";
import { auth } from "../../db";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { authUser } from "../../db/schema/authUser";
import { eq } from "drizzle-orm";
import { removeCookie, setCookie } from "../../utils/helpers/cookies";
import { TRPCError } from "@trpc/server";
import { handleTRPCError } from "../../utils/helpers/errors";

const authLoginBody = z.object({
  phone: z.string().min(8).max(16),
  password: z.string().min(6),
});

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(authLoginBody)
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db
          .select()
          .from(authUser)
          .where(eq(authUser.phone, input.phone));

        if (!user.length) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        const key = await auth.useKey("phone", input.phone, input.password);
        const session = await auth.createSession(key.userId);
        const sessionCookie = auth.createSessionCookie(session).serialize();
        setCookie(ctx.res, sessionCookie);

        return {
          success: true,
          message: "OK",
          data: {
            user: user[0],
            session,
          },
        };
      } catch (error) {
        return handleTRPCError(error);
      }
    }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await auth.invalidateSession(ctx.session.sessionId);
      removeCookie(ctx.res, "auth_session");

      return {
        success: true,
        message: "OK",
        data: null,
      };
    } catch (error) {
      return handleTRPCError(error);
    }
  }),

  validate: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const session = await auth.validateSession(ctx.session.sessionId);
      const sessionCookie = auth.createSessionCookie(session).serialize();
      setCookie(ctx.res, sessionCookie);

      return {
        success: true,
        message: "OK",
        data: {
          session,
        },
      };
    } catch (error) {
      return handleTRPCError(error);
    }
  }),
});
