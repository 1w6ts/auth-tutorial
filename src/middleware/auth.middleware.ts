import { Context, Next } from "hono";
import { verifyToken, JwtPayload } from "../utils/jwt.utils";

declare module "hono" {
  interface ContextVariableMap {
    user: JwtPayload;
  }
}

export async function authMiddleware(ctx: Context, next: Next) {
  const authHeader = ctx.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ctx.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];
  const user = verifyToken(token);

  if (!user) {
    return ctx.json({ error: "Unauthorized" }, 401);
  }

  // add user to context
  ctx.set("user", user);
  await next();
}
