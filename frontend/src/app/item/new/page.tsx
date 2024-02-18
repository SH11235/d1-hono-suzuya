"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { JwtProvider } from "@/context/CredentialProvider";
import { NewTitle } from "./components/new";

const WorkerPage = () => {
    return (
        <>
            <JwtProvider>
                <Header />
                <QueryClientProvider client={new QueryClient()}>
                    <div className="flex flex-col items-center justify-center space-y-4 min-h-screen bg-gray-100">
                        <NewTitle />
                    </div>
                </QueryClientProvider>
            </JwtProvider>
        </>
    );
};

export default WorkerPage;
