import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { timing } from "hono/timing";
import { prettyJSON } from "hono/pretty-json";

import * as authController from "./controllers/auth.controller";
import { authMiddleware } from "./middleware/auth.middleware";

const app = new Hono();

// middleware
app.use("*", logger());
app.use("*", timing());
app.use("*", prettyJSON());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// routes
app.post("/register", authController.register);
app.post("/login", authController.login);
app.get("/protected", authMiddleware, authController.protectedRoute);

// api health check
app.get("/", (c) => c.json({ status: "ok" }));

// start server
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
