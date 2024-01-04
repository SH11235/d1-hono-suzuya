import { Hono } from "hono";

import { Bindings } from "./types";
import { corsMiddleware } from "./middlewares/cors";
import { adminRoutes } from "./routes/admin";
import { authMiddleware } from "./middlewares/auth";
import { workerRoutes } from "./routes/worker";
import { makerRoutes } from "./routes/maker";
import { itemRoutes } from "./routes/item";

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (context) => context.text("Hello 🔥"));

app.use("*", corsMiddleware);
app.use("*", authMiddleware);

adminRoutes(app);
itemRoutes(app);
makerRoutes(app);
workerRoutes(app);

export default app;
