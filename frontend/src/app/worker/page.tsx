"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { WorkerList } from "@/app/worker/components/workerList";
import { JwtProvider } from "@/context/CredentialProvider";

const WorkerPage = () => {
    return (
        <>
            <JwtProvider>
                <Header />
                <QueryClientProvider client={new QueryClient()}>
                    <div className="flex flex-col items-center justify-center space-y-4 min-h-screen bg-gray-100">
                        <WorkerList />
                    </div>
                </QueryClientProvider>
            </JwtProvider>
        </>
    );
};

export default WorkerPage;
