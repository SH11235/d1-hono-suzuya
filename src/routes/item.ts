import { asc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { ulid } from "ulidx";

import { item } from "../schema";
import { maker } from "../schema";
import { title } from "../schema";
import { worker } from "../schema";
import { Bindings, ItemCreateRequest, ItemUpdateRequest, ItemsQueryResult, TitlesQueryResult } from "../types";

export const itemRoutes = (app: Hono<{ Bindings: Bindings }>) => {
    app.get("/titles", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                title: title,
                item: item,
                maker: maker,
                worker: worker,
            },
        });

        try {
            // raw SQL for SQLite
            // 組込み関数strftimeを使うため
            const yearMonthStatement = sql`
                SELECT
                    strftime('%Y/%m', release_date) as yyyymm,
                    strftime('%Y', release_date) as year,
                    strftime('%m', release_date) as month
                FROM title
                WHERE deleted = FALSE
                GROUP BY yyyymm, year, month
                ORDER BY yyyymm NULLS FIRST;
            `;

            const resultYearMonth: {
                yyyymm: string;
                year: string;
                month: string;
            }[] = await db.all(yearMonthStatement);

            // raw SQL for SQLite
            // CASE WHEN で並び替えするため
            const titlesQuery = sql`
                SELECT
                    strftime('%Y/%m', release_date) as yyyymm,
                    strftime('%Y', release_date) as year,
                    strftime('%m', release_date) as month,
                    id,
                    name,
                    release_date,
                    reservation_start_date,
                    reservation_deadline,
                    order_date_to_maker,
                    updated_at,
                    project_type,
                    catalog_status,
                    announcement_status,
                    remarks,
                    delivery_date,
                    list_submission_date
                FROM title
                WHERE deleted = FALSE
                ORDER BY release_date ASC NULLS FIRST,
                CASE project_type WHEN 'S案件' THEN 1
                                  WHEN 'Y案件' THEN 2
                                  WHEN 'デフォルト' THEN 3
                                  WHEN '再販' THEN 4
                                  ELSE 5
                END ASC
            `;

            const titles: TitlesQueryResult[] = await db.all(titlesQuery);

            // const items = await db
            //     .select()
            //     .from(item)
            //     .where(eq(item.deleted, 0))
            //     .orderBy(asc(item.product_code));
            // だと NULLS FIRST を指定できないので raw SQL を使う
            const itemsQuery = sql`
                SELECT
                    "id",
                    "title_id",
                    "name",
                    "product_code",
                    "sku",
                    "item_status",
                    "pic_item_id",
                    "maker_id",
                    "retail_price",
                    "deleted",
                    "resubmission",
                    "line",
                    "rough_coordinator_id",
                    "rough_check_person_id",
                    "line_art_coordinator_id",
                    "line_art_check_person_id",
                    "coloring_coordinator_id",
                    "coloring_check_person_id",
                    "design_coordinator_id",
                    "design_check_person_id",
                    "submission_data_coordinator_id",
                    "submission_data_check_person_id",
                    "announcement_materials_coordinator_id",
                    "announcement_materials_check_person_id",
                    "jan_coordinator_id",
                    "jan_check_person_id"
                FROM item
                WHERE
                    "item"."deleted" = 0
                ORDER BY
                    "item"."product_code" ASC NULLS FIRST;
            `;
            const items: ItemsQueryResult[] = await db.all(itemsQuery);
            const ret = resultYearMonth.map((yearMonth) => {
                const yyyymmTitles = titles.filter((title) => title.yyyymm === yearMonth.yyyymm);
                const titleWithItems = yyyymmTitles.map((title) => {
                    const titleItems = items.filter((item) => item.title_id === title.id);
                    return {
                        ...title,
                        items: titleItems,
                    };
                });

                return {
                    yyyymm: yearMonth.yyyymm,
                    year: yearMonth.year,
                    month: yearMonth.month,
                    title_count: yyyymmTitles.length,
                    item_count: titleWithItems.map((title) => title.items.length).reduce((a, b) => a + b, 0),
                    title_list: titleWithItems,
                };
            }
            );

            return c.json(ret, 200);
        } catch (error) {
            console.error(error);
            return c.json({ error: "取得処理中にエラーが発生しました" }, 500);
        }
    });

    app.get("/makers_and_workers", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                maker: maker,
                worker: worker,
            },
        });

        try {
            const makerResult = await db.query.maker.findMany({
                columns: {
                    id: true,
                    code_name: true,
                    deleted: true,
                },
                where: eq(maker.deleted, 0),
            });

            const workerResult = await db.query.worker.findMany({
                columns: {
                    id: true,
                    name: true,
                    deleted: true,
                },
                where: eq(worker.deleted, 0),
            });

            return c.json({
                makers: makerResult,
                workers: workerResult,
            }, 200);
        } catch (error) {
            console.error(error);
            return c.json({ error: "取得処理中にエラーが発生しました" }, 500);
        }
    });

    app.get("/title/:titleId", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                title: title,
                item: item,
                maker: maker,
                worker: worker,
            },
        });

        const titleId = c.req.param("titleId");

        try {
            const titleResult = await db
                .select()
                .from(title)
                .where(eq(title.id, titleId))
                .execute();

            const items = await db
                .select()
                .from(item)
                .where(eq(item.title_id, titleId))
                .execute();

            const makerResult = await db.query.maker.findMany({
                columns: {
                    id: true,
                    code_name: true,
                    deleted: true,
                },
                where: eq(maker.deleted, 0),
            });

            const workerResult = await db.query.worker.findMany({
                columns: {
                    id: true,
                    name: true,
                    deleted: true,
                },
                where: eq(worker.deleted, 0),
            });

            return c.json({
                items: items,
                makers: makerResult,
                workers: workerResult,
                ...titleResult,
            }, 200);
        } catch (error) {
            console.error(error);
            return c.json({ error: "取得処理中にエラーが発生しました" }, 500);
        }
    });

    app.post("/title", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                title: title,
            },
        });

        const titleId = ulid();
        const { name, release_date, reservation_start_date, reservation_deadline, order_date_to_maker, project_type, catalog_status, announcement_status, remarks, delivery_date, list_submission_date } = await c.req.json<{
            name: string;
            release_date: string | null;
            reservation_start_date: string | null;
            reservation_deadline: string | null;
            order_date_to_maker: string | null;
            project_type: string;
            catalog_status: string;
            announcement_status: string;
            remarks: string | null;
            delivery_date: string | null;
            list_submission_date: string | null;
        }>();
        const updated_at = new Date().toISOString();

        try {
            await db.insert(title).values({
                id: titleId,
                name: name,
                release_date: release_date,
                reservation_start_date: reservation_start_date,
                reservation_deadline: reservation_deadline,
                order_date_to_maker: order_date_to_maker,
                project_type: project_type,
                catalog_status: catalog_status,
                announcement_status: announcement_status,
                remarks: remarks,
                deleted: 0,
                updated_at: updated_at,
                delivery_date: delivery_date,
                list_submission_date: list_submission_date,
            });

            return c.json(
                {
                    id: titleId,
                },
                201,
            );
        } catch (error) {
            console.error(error);
            return c.json({ error: "登録処理中にエラーが発生しました" }, 500);
        }
    });

    app.put("/title/:titleId", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                title: title,
            },
        });

        const titleId = c.req.param("titleId");
        const { name, release_date, reservation_start_date, reservation_deadline, order_date_to_maker, project_type, catalog_status, announcement_status, remarks, delivery_date, list_submission_date } = await c.req.json<{
            name: string;
            release_date: string | null;
            reservation_start_date: string | null;
            reservation_deadline: string | null;
            order_date_to_maker: string | null;
            project_type: string;
            catalog_status: string;
            announcement_status: string;
            remarks: string | null;
            delivery_date: string | null;
            list_submission_date: string | null;
        }>();
        const updated_at = new Date().toISOString();

        try {
            await db.update(title).set({
                name: name,
                release_date: release_date,
                reservation_start_date: reservation_start_date,
                reservation_deadline: reservation_deadline,
                order_date_to_maker: order_date_to_maker,
                project_type: project_type,
                catalog_status: catalog_status,
                announcement_status: announcement_status,
                remarks: remarks,
                updated_at: updated_at,
                delivery_date: delivery_date,
                list_submission_date: list_submission_date,
            }).where(eq(title.id, titleId)).execute();

            return c.json(
                {
                    id: titleId,
                },
                201,
            );
        } catch (error) {
            console.error(error);
            return c.json({ error: "更新処理中にエラーが発生しました" }, 500);
        }
    });

    app.delete("/title/:titleId", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                title: title,
            },
        });

        const titleId = c.req.param("titleId");

        try {
            await db.update(title).set({
                deleted: 1,
            }).where(eq(title.id, titleId)).execute();

            return c.json(
                {
                    id: titleId,
                },
                201,
            );
        } catch (error) {
            console.error(error);
            return c.json({ error: "削除処理中にエラーが発生しました" }, 500);
        }
    });

    app.post("/items", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                item: item,
                title: title,
            },
        });

        const itemId = ulid();

        const itemInputs = await c.req.json<ItemCreateRequest[]>();

        try {
            await db.insert(item).values(itemInputs.map((itemInput) => ({
                id: itemId,
                title_id: itemInput.titleId,
                name: itemInput.name,
                product_code: itemInput.productCode,
                sku: itemInput.sku,
                item_status: itemInput.itemStatus,
                pic_item_id: itemInput.picItemId,
                maker_id: itemInput.makerId,
                retail_price: itemInput.retailPrice,
                deleted: 0,
                resubmission: itemInput.resubmission ? 1 : 0,
                line: itemInput.line,
                rough_coordinator_id: itemInput.roughCoordinatorId,
                rough_check_person_id: itemInput.roughCheckPersonId,
                line_art_coordinator_id: itemInput.lineArtCoordinatorId,
                line_art_check_person_id: itemInput.lineArtCheckPersonId,
                coloring_coordinator_id: itemInput.coloringCoordinatorId,
                coloring_check_person_id: itemInput.coloringCheckPersonId,
                design_coordinator_id: itemInput.designCoordinatorId,
                design_check_person_id: itemInput.designCheckPersonId,
                submission_data_coordinator_id: itemInput.submissionDataCoordinatorId,
                submission_data_check_person_id: itemInput.submissionDataCheckPersonId,
                announcement_materials_coordinator_id: itemInput.announcementMaterialsCoordinatorId,
                announcement_materials_check_person_id: itemInput.announcementMaterialsCheckPersonId,
                jan_coordinator_id: itemInput.janCoordinatorId,
                jan_check_person_id: itemInput.janCheckPersonId,
            })));

            return c.json(
                {
                    id: itemId,
                },
                201,
            );
        } catch (error) {
            console.error(error);
            return c.json({ error: "登録処理中にエラーが発生しました" }, 500);
        }
    });

    app.put("/items", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                item: item,
                title: title,
            },
        });
        const requestItems = await c.req.json<ItemUpdateRequest[]>();

        try {
            await requestItems.map(async (itemUpdate) => (db.update(item).set({
                name: itemUpdate.name,
                product_code: itemUpdate.productCode,
                sku: itemUpdate.sku,
                item_status: itemUpdate.itemStatus,
                pic_item_id: itemUpdate.picItemId,
                maker_id: itemUpdate.makerId,
                retail_price: itemUpdate.retailPrice,
                deleted: 0,
                resubmission: itemUpdate.resubmission ? 1 : 0,
                line: itemUpdate.line,
                rough_coordinator_id: itemUpdate.roughCoordinatorId,
                rough_check_person_id: itemUpdate.roughCheckPersonId,
                line_art_coordinator_id: itemUpdate.lineArtCoordinatorId,
                line_art_check_person_id: itemUpdate.lineArtCheckPersonId,
                coloring_coordinator_id: itemUpdate.coloringCoordinatorId,
                coloring_check_person_id: itemUpdate.coloringCheckPersonId,
                design_coordinator_id: itemUpdate.designCoordinatorId,
                design_check_person_id: itemUpdate.designCheckPersonId,
                submission_data_coordinator_id: itemUpdate.submissionDataCoordinatorId,
                submission_data_check_person_id: itemUpdate.submissionDataCheckPersonId,
                announcement_materials_coordinator_id: itemUpdate.announcementMaterialsCoordinatorId,
                announcement_materials_check_person_id: itemUpdate.announcementMaterialsCheckPersonId,
                jan_coordinator_id: itemUpdate.janCoordinatorId,
                jan_check_person_id: itemUpdate.janCheckPersonId,
            }).where(eq(item.id, itemUpdate.id))));

            return c.json({}, 204);
        } catch (error) {
            console.error(error);
            return c.json({ error: "更新処理中にエラーが発生しました" }, 500);
        }
    });

    app.delete("/items/:id", async (c) => {
        const db = drizzle(c.env.DB, {
            schema: {
                item: item,
            },
        });

        const itemId = c.req.param("id");

        try {
            await db.update(item).set({
                deleted: 1,
            }).where(eq(item.id, itemId)).execute();

            return c.json(
                {
                    id: itemId,
                },
                201,
            );
        } catch (error) {
            console.error(error);
            return c.json({ error: "削除処理中にエラーが発生しました" }, 500);
        }
    });
};
