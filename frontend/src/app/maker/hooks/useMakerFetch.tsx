import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useJwtToken } from "@/context/useJWTToken";
import { GetMaker, CreatedMaker, Maker } from "@/types/maker";
import { useState } from "react";

export const useMakerFetch = () => {
    const { jwtToken } = useJwtToken();
    const [makers, setMakers] = useState<Maker[]>([]);
    const queryClient = useQueryClient();

    const { isLoading, error } = useQuery({
        queryKey: ["maker"],
        queryFn: async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/makers", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Maker情報の取得に失敗しました");
            }
            const data = await response.json() as GetMaker[];
            const makers = data.map((maker) => {
                return {
                    ...maker,
                    changed: false,
                    saved: true,
                };
            });
            setMakers(makers);
            return data;
        },
    });

    const addMaker = useMutation({
        mutationFn: async (code_name: string) => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/makers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({ code_name: code_name }),
            });
            if (!response.ok) {
                throw new Error("Maker情報の追加に失敗しました");
            }
            queryClient.invalidateQueries({
                queryKey: ["maker"],
            });
            return await response.json() as CreatedMaker;
        },
    });

    const updateMaker = useMutation({
        mutationFn: async ({ id, code_name }: { id: string; code_name: string }) => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/makers/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({ code_name: code_name }),
            });
            if (!response.ok) {
                throw new Error("Maker情報の更新に失敗しました");
            }
            queryClient.invalidateQueries({
                queryKey: ["maker"],
            });
            return response.json();
        },
    });

    const deleteMaker = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/makers/" + id, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Maker情報の削除に失敗しました");
            }
            queryClient.invalidateQueries({
                queryKey: ["maker"],
            });
            return response.json();
        },
    });

    return {
        makers: makers,
        setMakers: setMakers,
        addMaker: addMaker,
        updateMaker: updateMaker,
        deleteMaker: deleteMaker,
        isLoading,
        error
    };
};
