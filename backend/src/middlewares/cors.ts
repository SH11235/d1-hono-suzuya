import { Context } from "hono";
import { cors } from "hono/cors";

import { Bindings } from "../types";


export const corsMiddleware = async (
    context: Context<
        { Bindings: Bindings; },
        "*",
        {}
    >,
    next: () => Promise<void>
) => {
    const corsMiddleware = cors({
        origin: [context.env.CORS_ORIGIN],
        allowHeaders: ['Origin', 'Content-Type', 'Authorization'],
        allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    });
    return await corsMiddleware(context, next);
}
