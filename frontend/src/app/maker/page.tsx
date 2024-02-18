"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { MakerList } from "@/app/maker/components/makerList";
import { JwtProvider } from "@/context/CredentialProvider";

const WorkerPage = () => {
    return (
        <>
            <JwtProvider>
                <Header />
                <QueryClientProvider client={new QueryClient()}>
                    <div className="flex flex-col items-center justify-center space-y-4 min-h-screen bg-gray-100">
                        <MakerList />
                    </div>
                </QueryClientProvider>
            </JwtProvider>
        </>
    );
};

export default WorkerPage;
