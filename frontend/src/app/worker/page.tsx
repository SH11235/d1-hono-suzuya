"use client";

import { useWorkerFetch } from "@/app/worker/hooks/useWorkerFetch";
import { Header } from "@/components/header";
import { WorkerList } from "@/app/worker/components/workerList";
import { Suspense } from "react";

const WorkerPage = () => {
    const workersManager = useWorkerFetch();
    return (
        <div className="flex flex-col items-center justify-start space-y-4 min-h-screen bg-gray-100 pt-10">
            <h1 className="text-3xl font-bold">担当者一覧</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <div className="flex flex-col items-center justify-center space-y-4 bg-gray-100">
                    {workersManager.isLoading ? (
                        <p>読み込み中...</p>
                    ) : workersManager.error ? (
                        <p>エラーが発生しました</p>
                    ) : (
                        <WorkerList workers={workersManager.workers} setWorkers={workersManager.setWorkers} />
                    )}
                </div>
            </Suspense>
        </div>
    );
};

export default WorkerPage;
