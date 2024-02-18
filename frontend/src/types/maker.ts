// GET /makersのレスポンスに対応する型
export type GetMaker = {
    id: string;
    code_name: string;
};

// POST /makersのレスポンスに対応する型
export type CreatedMaker = {
    id: string;
};

// 表示用の型
export type Maker = GetMaker & {
    changed: boolean;
    saved: boolean;
};
