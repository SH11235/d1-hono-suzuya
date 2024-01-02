import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { ulid } from "ulidx";

import { maker } from "../schema";
import { Bindings } from "../types";

export const makerRoutes = (app: Hono<{ Bindings: Bindings }>) => {
    app.get("/makers", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                maker: maker,
            },
        });

        try {
            // deletedが0（未削除）のものだけ取得する
            const result = await db.query.maker.findMany({
                columns: {
                    id: true,
                    code_name: true,
                    deleted: true,
                },
                where: eq(maker.deleted, 0),
            });

            return c.json(result, 200);
        } catch (error) {
            console.error(error);
            return c.json({ error: "取得処理中にエラーが発生しました" }, 500);
        }

    });

    app.post("/makers", async (c) => {
        const db = drizzle(c.env.DB);

        const { code_name } = await c.req.json<{
            code_name: string;
        }>();

        const makerId = ulid();

        try {
            await db.insert(maker).values({
                id: makerId,
                code_name: code_name,
                deleted: 0,
            });

            return c.json(
                {
                    id: makerId,
                },
                201,
            );
        } catch (error) {
            console.error(error);
            return c.json({ error: "登録処理中にエラーが発生しました" }, 500);
        }

    });

    app.put("/makers/:id", async (c) => {
        const db = drizzle(c.env.DB);
        const makerId = c.req.param("id");

        const { code_name } = await c.req.json<{
            code_name: string;
        }>();

        try {
            const updateResult = await db.update(maker).set({
                code_name: code_name,
            }).where(eq(maker.id, makerId));

            if (updateResult.meta.changes === 0) {
                console.error("makerId: " + makerId + " に該当するmakerが存在しません");
                return c.json({ error: "更新対象が存在しません" }, 404);
            }

            return c.json(
                {
                    id: makerId,
                },
                200,
            );
        } catch (error) {
            console.error(error);
            return c.json({ error: "更新処理中にエラーが発生しました" }, 500);
        }
    });

    app.delete("/makers/:id", async (c) => {
        const db = drizzle(c.env.DB);
        const makerId = c.req.param("id");

        try {
            const updateResult = await db.update(maker).set({
                deleted: 1,
            }).where(eq(maker.id, makerId));

            if (updateResult.meta.changes === 0) {
                console.error("makerId: " + makerId + " に該当するmakerが存在しません");
                return c.json({ error: "削除対象が存在しません" }, 404);
            }

            return c.json(
                {
                    id: makerId,
                },
                200,
            );
        } catch (error) {
            console.error(error);
            return c.json({ error: "削除処理中にエラーが発生しました" }, 500);
        }
    });
};
