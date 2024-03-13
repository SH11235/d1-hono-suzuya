"use client";

import { SuzuyaWorker } from "@/types/worker";
import { AddButton } from "./addButton";
import { DeleteButton } from "./deleteButton";
import { SaveButton } from "./saveButton";
import { useState } from "react";

type WorkerListProps = {
    workers: SuzuyaWorker[];
    setWorkers: React.Dispatch<React.SetStateAction<SuzuyaWorker[]>>;
};

export const WorkerList = ({ workers, setWorkers }: WorkerListProps) => {
    const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);
    return (
        <>
            <div className="flex flex-col items-center justify-center space-y-4">
                {
                    workers?.map((worker, index) => (
                        <div key={worker.id} className="flex flex-col items-center justify-center space-y-4">
                            <div className="flex items-center justify-center space-x-4">
                                <p>{index + 1}</p>
                                <input type="text" value={worker.name}
                                    onChange={
                                        (e) => {
                                            setWorkers(
                                                (prev) => prev.map((w) => {
                                                    if (w.id === worker.id) {
                                                        return { ...w, name: e.target.value, changed: true };
                                                    }
                                                    return w;
                                                })
                                            );
                                        }}
                                />
                                <SaveButton worker={worker} setIsAddButtonVisible={setIsAddButtonVisible} setWorkers={setWorkers} />
                                <DeleteButton worker={worker} setWorkers={setWorkers} />
                            </div>
                        </div>
                    ))
                }
            </div>
            <AddButton workers={workers} setWorkers={setWorkers} isAddButtonVisible={isAddButtonVisible} setIsAddButtonVisible={setIsAddButtonVisible} />
        </>
    );
};
