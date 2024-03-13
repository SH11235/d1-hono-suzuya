"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { JwtProvider } from "@/context/CredentialProvider";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <JwtProvider>
                {children}
            </JwtProvider>
        </QueryClientProvider>
    );
};
