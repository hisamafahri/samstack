import { z } from "zod";
import { auth } from "../../db";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { authUser } from "../../db/schema/authUser";
import { eq } from "drizzle-orm";
import { setCookie } from "../../utils/helpers/cookies";
import { handleTRPCError } from "../../utils/helpers/errors";

const userCreateBody = z.object({
  phone: z.string().min(8).max(16),
  password: z.string().min(6),
});

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(userCreateBody)
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await auth.createUser({
          primaryKey: {
            providerId: "phone",
            providerUserId: input.phone,
            password: input.password,
          },
          attributes: {
            phone: input.phone,
          },
        });
        const session = await auth.createSession(user.userId);
        const sessionCookie = auth.createSessionCookie(session).serialize();
        setCookie(ctx.res, sessionCookie);

        return {
          success: true,
          message: "OK",
          data: {
            user,
            session,
          },
        };
      } catch (error) {
        return handleTRPCError(error);
      }
    }),

  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db
      .select()
      .from(authUser)
      .where(eq(authUser.id, ctx.session.userId));

    return { success: true, message: "OK", data: user[0] };
  }),
});
