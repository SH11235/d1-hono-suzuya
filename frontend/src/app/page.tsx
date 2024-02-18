"use client";

import { Toaster } from "react-hot-toast";
import { LoginForm } from "../components/loginForm";
import { JwtProvider } from "@/context/CredentialProvider";

const LoginPage = () => {
    return (
        <>
            <JwtProvider>
                <div className="flex flex-col items-center justify-center space-y-4 min-h-screen bg-gray-100">
                    <LoginForm />
                </div>
            </JwtProvider>
            <Toaster />
        </>
    );
};

export default LoginPage;
