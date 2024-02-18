"use client";

import { useWorkerFetch } from "@/app/worker/hooks/useWorkerFetch";
import { AddButton } from "./addButton";
import { UpdateButton } from "./updateButton";
import { DeleteButton } from "./deleteButton";
import { SaveButton } from "./saveButton";
import { useState } from "react";

export const WorkerList = () => {
    const workersManager = useWorkerFetch();
    const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);
    return (
        <div className="flex flex-col items-center justify-start space-y-4 min-h-screen bg-gray-100 pt-10">
            <h1 className="text-3xl font-bold">担当者一覧</h1>
            <div className="flex flex-col items-center justify-center space-y-4">
                {workersManager.isLoading ? (
                    <p>読み込み中...</p>
                ) : workersManager.error ? (
                    <p>エラーが発生しました</p>
                ) : (
                    workersManager.workers?.map((worker, index) => (
                        <div key={worker.id} className="flex flex-col items-center justify-center space-y-4">
                            <div className="flex items-center justify-center space-x-4">
                                <p>{index + 1}</p>
                                <input type="text" value={worker.name}
                                    onChange={
                                        (e) => {
                                            workersManager.setWorkers(
                                                // ここで触られているworkerのstateだけを更新する
                                                workersManager.workers.map((w) => {
                                                    if (w.id === worker.id) {
                                                        return { ...w, name: e.target.value, changed: true };
                                                    }
                                                    return w;
                                                })
                                            );
                                        }}
                                />
                                <SaveButton worker={worker} setIsAddButtonVisible={setIsAddButtonVisible} setWorkers={workersManager.setWorkers} />
                                <DeleteButton worker={worker} setWorkers={workersManager.setWorkers} />
                            </div>
                        </div>
                    ))
                )}
            </div>
            <AddButton workers={workersManager.workers} setWorkers={workersManager.setWorkers} isAddButtonVisible={isAddButtonVisible} setIsAddButtonVisible={setIsAddButtonVisible} />
        </div>
    );
};
