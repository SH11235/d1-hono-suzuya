import { Context } from "hono";
import { Bindings, JWTPayload } from "../types";
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
    if (
        authSkipEndpoints.some(
            (endpoint) => context.req.path === endpoint.path && context.req.method === endpoint.method
        ) ||
        context.env.ENV === "dev"
    ) {
        await next();
        return;
    }

    // 認証
    await jwt({
        secret: context.env.JWT_SECRET_KEY,
        alg: "HS256",
    })(context, async () => { });
    const payload = context.get('jwtPayload') as JWTPayload;
    const role = payload.role;
    if (role !== "admin") {
        // TODO role: "user" の場合の制限について検討する
        return context.json(
            {
                error: "権限がありません",
            },
            403
        );
    } else {
        await next();
    }
};
