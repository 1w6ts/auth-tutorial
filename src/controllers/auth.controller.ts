import { Context } from "hono";
import { authService } from "../services/auth.service";
import { UserSchema } from "../models/user.model";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function register(ctx: Context) {
  try {
    const body = await ctx.req.json();

    // validate inputs
    const validatedData = UserSchema.parse(body);

    const result = await authService.register(validatedData);
    return ctx.json(result, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json(
        { error: "Validation error", details: error.errors },
        400
      );
    }
    if (error instanceof Error) {
      return ctx.json({ error: error.message }, 400);
    }
    return ctx.json({ error: "Unknown error" }, 500);
  }
}

export async function login(ctx: Context) {
  try {
    const body = await ctx.req.json();

    // validate inputs
    const validatedData = LoginSchema.parse(body);

    const result = await authService.login(
      validatedData.email,
      validatedData.password
    );
    return ctx.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ctx.json(
        { error: "Validation error", details: error.errors },
        400
      );
    }
    if (error instanceof Error) {
      return ctx.json({ error: error.message }, 400);
    }
    return ctx.json({ error: "Unknown error" }, 500);
  }
}

export async function protectedRoute(ctx: Context) {
  const user = ctx.get("user");
  return ctx.json({ message: "Protected data", user });
}
