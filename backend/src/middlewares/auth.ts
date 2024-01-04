import { Context } from "hono";
import { Bindings } from "../types";
import { jwt } from "hono/jwt";

const authSkipEndpoints = [
    { path: "/admin-login", method: "POST" },
];

export const authMiddleware = async (
    context: Context<
        { Bindings: Bindings; },
        "*",
        {}
    >,
    next: () => Promise<void>
) => {
    // 認証のスキップ
    if (authSkipEndpoints.some((endpoint) => context.req.path === endpoint.path && context.req.method === endpoint.method)) {
        await next();
        return;
    }

    // 認証
    await jwt({
        secret: context.env.JWT_SECRET_KEY,
        alg: "HS256",
    })(context, async () => { });
    await next();
};
