"use client";

import { Header } from "@/components/header";
import { MakerList } from "@/app/maker/components/makerList";

const WorkerPage = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center space-y-4 min-h-screen bg-gray-100">
                <MakerList />
            </div>
        </>
    );
};

export default WorkerPage;
