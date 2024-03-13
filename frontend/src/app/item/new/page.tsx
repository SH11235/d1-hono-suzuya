"use client";

import { Header } from "@/components/header";
import { NewTitle } from "./components/new";

const WorkerPage = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center space-y-4 min-h-screen bg-gray-100">
                <NewTitle />
            </div>
        </>
    );
};

export default WorkerPage;
