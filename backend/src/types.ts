export type Bindings = {
    DB: D1Database;
    KV: KVNamespace;
    RESEND_API_KEY: string;
    JWT_SECRET_KEY: string;
    CORS_ORIGIN: string;
};

export type JWTPayload = {
    role: "admin" | "user";
    userUuid: string;
    email: string;
};

export type ItemCreateRequest = {
    titleId: string;
    name: string;
    productCode: string | null;
    sku: number | null;
    itemStatus: string;
    picItemId: string | null;
    makerId: string | null;
    retailPrice: number | null;
    resubmission: boolean;
    line: string;
    roughCoordinatorId: string | null;
    roughCheckPersonId: string | null;
    lineArtCoordinatorId: string | null;
    lineArtCheckPersonId: string | null;
    coloringCoordinatorId: string | null;
    coloringCheckPersonId: string | null;
    designCoordinatorId: string | null;
    designCheckPersonId: string | null;
    submissionDataCoordinatorId: string | null;
    submissionDataCheckPersonId: string | null;
    announcementMaterialsCoordinatorId: string | null;
    announcementMaterialsCheckPersonId: string | null;
    janCoordinatorId: string | null;
    janCheckPersonId: string | null;
};

export type ItemUpdateRequest = Omit<ItemCreateRequest, "titleId"> & {
    id: string;
};

export type TitlesQueryResult = {
    yyyymm: string | null;
    year: string | null;
    month: string | null;
    id: string;
    name: string;
    release_date: string | null;
    reservation_start_date: string | null;
    reservation_deadline: string | null;
    order_date_to_maker: string | null;
    updated_at: string;
    project_type: string;
    catalog_status: string;
    announcement_status: string;
    remarks: string | null;
    delivery_date: string | null;
    list_submission_date: string | null;
};

export type ItemsQueryResult = {
    id: string;
    title_id: string;
    name: string;
    product_code: string | null;
    sku: number | null;
    item_status: string;
    pic_item_id: string | null;
    maker_id: string | null;
    retail_price: number | null;
    deleted: boolean;
    resubmission: 0 | 1;
    line: string;
    rough_coordinator_id: string | null;
    rough_check_person_id: string | null;
    line_art_coordinator_id: string | null;
    line_art_check_person_id: string | null;
    coloring_coordinator_id: string | null;
    coloring_check_person_id: string | null;
    design_coordinator_id: string | null;
    design_check_person_id: string | null;
    submission_data_coordinator_id: string | null;
    submission_data_check_person_id: string | null;
    announcement_materials_coordinator_id: string | null;
    announcement_materials_check_person_id: string | null;
    jan_coordinator_id: string | null;
    jan_check_person_id: string | null;
};
