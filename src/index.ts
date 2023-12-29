import { Hono } from "hono";

import { Bindings } from "./types";
import { corsMiddleware } from "./middlewares/cors";
import { adminRoutes } from "./routes/admin";
import { authMiddleware } from "./middlewares/auth";

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (context) => context.text("Hello 🔥"));

app.use("*", corsMiddleware);
app.use("*", authMiddleware);

adminRoutes(app);

export default app;
