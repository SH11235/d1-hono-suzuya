import { useQueryClient } from "@tanstack/react-query";
import { useJwtToken } from "@/context/useJWTToken";

export const useUpdateWorkerFetch = () => {
    const { jwtToken } = useJwtToken();
    const queryClient = useQueryClient();

    const updateWorker = async (id: string, name: string) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/workers/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({ name: name }),
        });
        if (!response.ok) {
            throw new Error("Worker情報の更新に失敗しました");
        }
        queryClient.invalidateQueries({
            queryKey: ["worker"],
        });
    };

    return { updateWorker };
};
