// GET /workersのレスポンスに対応する型
export type GetWorker = {
    id: string;
    name: string;
};

// POST /workersのレスポンスに対応する型
export type CreatedWorker = {
    id: string;
};

// 表示用の型
export type SuzuyaWorker = GetWorker & {
    changed: boolean;
    saved: boolean;
};
