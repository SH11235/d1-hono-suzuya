"use client";

import { useMakerFetch } from "@/app/maker/hooks/useMakerFetch";
import { AddButton } from "./addButton";
import { DeleteButton } from "./deleteButton";
import { SaveButton } from "./saveButton";
import { useState } from "react";

export const MakerList = () => {
    const makersManager = useMakerFetch();
    const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);
    return (
        <div className="flex flex-col items-center justify-start space-y-4 min-h-screen bg-gray-100 pt-10">
            <h1 className="text-3xl font-bold">メーカー一覧</h1>
            <div className="flex flex-col items-center justify-center space-y-4">
                {makersManager.isLoading ? (
                    <p>読み込み中...</p>
                ) : makersManager.error ? (
                    <p>エラーが発生しました</p>
                ) : (
                    makersManager.makers?.map((maker, index) => (
                        <div key={maker.id} className="flex flex-col items-center justify-center space-y-4">
                            <div className="flex items-center justify-center space-x-4">
                                <p>{index + 1}</p>
                                <input type="text" value={maker.code_name}
                                    onChange={
                                        (e) => {
                                            makersManager.setMakers(
                                                (prev) => prev.map((m) => {
                                                    if (m.id === maker.id) {
                                                        return { ...m, code_name: e.target.value, changed: true };
                                                    }
                                                    return m;
                                                })
                                            );
                                        }}
                                />
                                <SaveButton maker={maker} setIsAddButtonVisible={setIsAddButtonVisible} setMakers={makersManager.setMakers} />
                                <DeleteButton maker={maker} setMakers={makersManager.setMakers} />
                            </div>
                        </div>
                    ))
                )}
            </div>
            <AddButton makers={makersManager.makers} setMakers={makersManager.setMakers} isAddButtonVisible={isAddButtonVisible} setIsAddButtonVisible={setIsAddButtonVisible} />
        </div>
    );
};
