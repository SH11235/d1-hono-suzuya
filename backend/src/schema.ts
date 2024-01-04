/*
  DO NOT RENAME THIS FILE FOR DRIZZLE-ORM TO WORK
*/
import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull().unique(),
    password_hash: text("password_hash").notNull(),
    role: text("role").notNull(),
});

export const maker = sqliteTable("maker", {
    id: text("id").primaryKey().notNull(),
    code_name: text("code_name").notNull().unique(),
    deleted: integer("deleted").notNull(),
});

export const title = sqliteTable("title", {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    release_date: text("release_date"),
    reservation_start_date: text("reservation_start_date"),
    reservation_deadline: text("reservation_deadline"),
    order_date_to_maker: text("order_date_to_maker"),
    project_type: text("project_type").notNull(),
    catalog_status: text("catalog_status").notNull(),
    announcement_status: text("announcement_status").notNull(),
    remarks: text("remarks"),
    deleted: integer("deleted").notNull(),
    updated_at: text("updated_at").default("CURRENT_TIMESTAMP"),
    delivery_date: text("delivery_date"),
    list_submission_date: text("list_submission_date"),
});

export const worker = sqliteTable("worker", {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    deleted: integer("deleted").notNull(),
});

export const item = sqliteTable("item", {
    id: text("id").primaryKey().notNull(),
    title_id: text("title_id").notNull().references(() => title.id),
    name: text("name").notNull(),
    product_code: text("product_code"),
    sku: integer("sku"),
    item_status: text("item_status").notNull(),
    pic_item_id: text("pic_item_id").references(() => worker.id),
    maker_id: text("maker_id").references(() => maker.id),
    retail_price: integer("retail_price"),
    deleted: integer("deleted").notNull(),
    resubmission: integer("resubmission").notNull(),
    line: text("line").notNull(),
    rough_coordinator_id: text("rough_coordinator_id").references(() => worker.id),
    rough_check_person_id: text("rough_check_person_id").references(() => worker.id),
    line_art_coordinator_id: text("line_art_coordinator_id").references(() => worker.id),
    line_art_check_person_id: text("line_art_check_person_id").references(() => worker.id),
    coloring_coordinator_id: text("coloring_coordinator_id").references(() => worker.id),
    coloring_check_person_id: text("coloring_check_person_id").references(() => worker.id),
    design_coordinator_id: text("design_coordinator_id").references(() => worker.id),
    design_check_person_id: text("design_check_person_id").references(() => worker.id),
    submission_data_coordinator_id: text("submission_data_coordinator_id").references(() => worker.id),
    submission_data_check_person_id: text("submission_data_check_person_id").references(() => worker.id),
    announcement_materials_coordinator_id: text("announcement_materials_coordinator_id").references(() => worker.id),
    announcement_materials_check_person_id: text("announcement_materials_check_person_id").references(() => worker.id),
    jan_coordinator_id: text("jan_coordinator_id").references(() => worker.id),
    jan_check_person_id: text("jan_check_person_id").references(() => worker.id),
});

export const maker_relations = relations(maker, ({ many }) => ({
    items: many(item),
}));

export const title_relations = relations(title, ({ many }) => ({
    items: many(item),
}));

export const worker_relations = relations(worker, ({ many }) => ({
    items: many(item),
}));

export const item_relations = relations(item, ({ one }) => ({
    maker: one(maker, {
        fields: [item.maker_id],
        references: [maker.id],
    }),
    title: one(title, {
        fields: [item.title_id],
        references: [title.id],
    }),
    pic_item: one(worker, {
        fields: [item.pic_item_id],
        references: [worker.id],
    }),
    rough_coordinator: one(worker, {
        fields: [item.rough_coordinator_id],
        references: [worker.id],
    }),
    rough_check_person: one(worker, {
        fields: [item.rough_check_person_id],
        references: [worker.id],
    }),
    line_art_coordinator: one(worker, {
        fields: [item.line_art_coordinator_id],
        references: [worker.id],
    }),
    line_art_check_person: one(worker, {
        fields: [item.line_art_check_person_id],
        references: [worker.id],
    }),
    coloring_coordinator: one(worker, {
        fields: [item.coloring_coordinator_id],
        references: [worker.id],
    }),
    coloring_check_person: one(worker, {
        fields: [item.coloring_check_person_id],
        references: [worker.id],
    }),
    design_coordinator: one(worker, {
        fields: [item.design_coordinator_id],
        references: [worker.id],
    }),
    design_check_person: one(worker, {
        fields: [item.design_check_person_id],
        references: [worker.id],
    }),
    submission_data_coordinator: one(worker, {
        fields: [item.submission_data_coordinator_id],
        references: [worker.id],
    }),
    submission_data_check_person: one(worker, {
        fields: [item.submission_data_check_person_id],
        references: [worker.id],
    }),
    announcement_materials_coordinator: one(worker, {
        fields: [item.announcement_materials_coordinator_id],
        references: [worker.id],
    }),
    announcement_materials_check_person: one(worker, {
        fields: [item.announcement_materials_check_person_id],
        references: [worker.id],
    }),
    jan_coordinator: one(worker, {
        fields: [item.jan_coordinator_id],
        references: [worker.id],
    }),
    jan_check_person: one(worker, {
        fields: [item.jan_check_person_id],
        references: [worker.id],
    }),
}));
