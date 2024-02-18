import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useJwtToken } from "@/context/useJWTToken";
import { GetWorker, CreatedWorker, SuzuyaWorker } from "@/types/worker";
import { useState } from "react";

export const useWorkerFetch = () => {
    const { jwtToken } = useJwtToken();
    const [workers, setWorkers] = useState<SuzuyaWorker[]>([]);
    const queryClient = useQueryClient();

    const { isLoading, error } = useQuery({
        queryKey: ["worker"],
        queryFn: async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/workers", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Worker情報の取得に失敗しました");
            }
            const data = await response.json() as GetWorker[];
            const workers = data.map((worker) => {
                return {
                    ...worker,
                    changed: false,
                    saved: true,
                };
            });
            setWorkers(workers);
            return data;
        },
    });

    const addWorker = useMutation({
        mutationFn: async (name: string) => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/workers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({ name: name }),
            });
            if (!response.ok) {
                throw new Error("Worker情報の追加に失敗しました");
            }
            queryClient.invalidateQueries({
                queryKey: ["worker"],
            });
            return await response.json() as CreatedWorker;
        },
    });

    const updateWorker = useMutation({
        mutationFn: async ({ id, name }: { id: string; name: string }) => {
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
            return response.json();
        },
    });

    const deleteWorker = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/workers/" + id, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Worker情報の削除に失敗しました");
            }
            queryClient.invalidateQueries({
                queryKey: ["worker"],
            });
            return response.json();
        },
    });

    return {
        workers: workers,
        setWorkers: setWorkers,
        addWorker: addWorker,
        updateWorker: updateWorker,
        deleteWorker: deleteWorker,
        isLoading,
        error
    };
};
