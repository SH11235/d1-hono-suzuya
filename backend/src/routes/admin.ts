import { Hono } from "hono";
import { Bindings } from "../types";
import { ulid } from "ulidx";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { user } from "../schema";
import { compare, genSalt, hash } from "bcryptjs";
import { sign } from "hono/jwt";

export const adminRoutes = (app: Hono<{ Bindings: Bindings }>) => {
    app.post("/admin-login", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                user: user,
            },
        });

        const { email, password } = await c.req.json<{
            email: string;
            password: string;
        }>();

        const result = await db.query.user.findFirst({
            where: eq(user.email, email),
            columns: {
                id: true,
                email: true,
                password_hash: true,
            },
        });

        if (!result) {
            console.debug("[DEBUG] userが存在しません。");
            return c.json(
                {
                    error: "userが存在しません",
                },
                404
            );
        }

        const is_match = await compare(password, result.password_hash);

        if (!is_match) {
            console.debug("[DEBUG] パスワードが一致しません。");
            return c.json(
                {
                    error: "パスワードが一致しません",
                },
                400
            );
        }

        const token = await sign(
            {
                role: "admin",
                userUuid: result.id,
                email: result.email,
            },
            c.env.JWT_SECRET_KEY,
            "HS256"
        );

        // 604800 = 1 week
        c.header("Set-Cookie", `token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800;`);

        return c.json(
            {
                message: "認証OK",
            },
            200
        );
    });

    app.post("/admin", async (c) => {
        console.debug("[DEBUG] ユーザー登録を開始します。");
        const db = drizzle(c.env.DB);

        const { email, password } = await c.req.json<{
            email: string;
            password: string;
        }>();

        const password_hash = await hash(password, await genSalt(10));

        const result = await db.insert(user).values({
            id: ulid(),
            email: email,
            password_hash: password_hash,
            role: "admin",
        });

        if (result.error) {
            console.error("[ERROR] ", result.error);
            return c.json(
                {
                    error: "ユーザー登録に失敗しました。",
                },
                500
            );
        }

        return c.json(result, 201);
    });
}
