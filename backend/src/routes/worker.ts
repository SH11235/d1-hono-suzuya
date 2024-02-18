import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { ulid } from "ulidx";

import { worker } from "../schema";
import { Bindings } from "../types";

export const workerRoutes = (app: Hono<{ Bindings: Bindings }>) => {
    app.get("/workers", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                worker: worker,
            },
        });

        try {
            // deletedが0（未削除）のものだけ取得する
            const result = await db.query.worker.findMany({
                columns: {
                    id: true,
                    name: true,
                },
                where: eq(worker.deleted, 0),
            });

            return c.json(result, 200);
        } catch (error) {
            console.error(error);
            return c.json({ error: "取得処理中にエラーが発生しました" }, 500);
        }

    });

    app.post("/workers", async (c) => {
        const db = drizzle(c.env.DB);

        const { name } = await c.req.json<{
            name: string;
        }>();

        const workerId = ulid();

        try {
            await db.insert(worker).values({
                id: workerId,
                name: name,
                deleted: 0,
            });

            return c.json(
                {
                    id: workerId,
                },
                201,
            );
        } catch (error) {
            console.error(error);
            return c.json({ error: "登録処理中にエラーが発生しました" }, 500);
        }
    });

    app.put("/workers/:id", async (c) => {
        const db = drizzle(c.env.DB);
        const workerId = c.req.param("id");
        const { name } = await c.req.json<{
            name: string;
        }>();

        try {
            const dbGet = drizzle(c.env.DB, {
                schema: {
                    worker: worker,
                },
            });
            const getResult = await dbGet.query.worker.findFirst({
                where: eq(worker.id, workerId),
                columns: {
                    id: true,
                    name: true,
                    deleted: true,
                },
            });

            // 該当するworkerが存在しない場合、getResult === undefinedとなる
            if (!getResult) {
                console.error("workerId: " + workerId + "に該当するworkerが存在しません");
                return c.json({ error: "該当するworkerが存在しません" }, 404);
            }

            const updateResult = await db.update(worker).set({
                name: name,
            }).where(eq(worker.id, workerId));

            if (updateResult.success) {
                return c.json({ id: workerId }, 200);
            } else {
                console.error("workerId: " + workerId + "の更新処理に失敗しました");
                return c.json({ error: "更新処理に失敗しました" }, 500);
            }
        } catch (error) {
            // データベースエラーやその他のエラーをキャッチ
            console.error(error);
            return c.json({ error: "更新処理中にエラーが発生しました" }, 500);
        }

    });

    app.delete("/workers/:id", async (c) => {
        const db = drizzle(c.env.DB);
        const workerId = c.req.param("id");

        try {
            const updateResult = await db.update(worker).set({
                deleted: 1,
            }).where(eq(worker.id, workerId));

            // 更新された行がない場合、該当するworkerが存在しないと判断
            if (updateResult.meta.changes === 0) {
                console.error("workerId: " + workerId + "に該当するworkerが存在しません");
                return c.json({ error: "該当するworkerが存在しません" }, 404);
            }

            return c.json({ id: workerId }, 200);
        } catch (error) {
            // データベースエラーやその他のエラーをキャッチ
            console.error(error);
            return c.json({ error: "削除処理中にエラーが発生しました" }, 500);
        }
    });
};
