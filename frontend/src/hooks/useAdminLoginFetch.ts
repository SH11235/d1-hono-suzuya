import { useJwtToken } from "../context/useJWTToken";
import { decodeJWTPayload } from "../utils/decodePayload";

export const useAdminLoginFetch = () => {
    const { setJwtToken } = useJwtToken();

    const adminLoginFetch = async (email: string, password: string) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/admin-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            console.error("ログインに失敗しました");
            return undefined;
        }
        const authHeader = response.headers.get("Authorization");
        if (!authHeader) {
            console.error("ログインに失敗しました");
            return undefined;
        }
        const jwtToken = authHeader.replace("Bearer ", "");
        setJwtToken(jwtToken);
        const payload = decodeJWTPayload(jwtToken);
        if (!payload) {
            console.error("ログインに失敗しました");
            return undefined;
        }
        if (payload.role !== "admin") {
            console.error("ログインに失敗しました");
            return undefined;
        }
        return payload;
    };

    return { adminLoginFetch };
};
