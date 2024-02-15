export type JwtAdminPayloadType = {
    role: string;
    userUuid: string;
    email: string;
};

export interface IJwtAdminContext {
    jwtToken: string | null;
    setJwtToken: (token: string | null) => void;
    getJwtPayload: () => JwtAdminPayloadType | null;
    deleteJwtTokenAndLogout: () => void;
}
