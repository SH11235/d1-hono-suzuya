"use client";

import { Toaster } from "react-hot-toast";
import { LoginForm } from "../components/loginForm";

const LoginPage = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center space-y-4 min-h-screen bg-gray-100">
                <LoginForm />
            </div>
            <Toaster />
        </>
    );
};

export default LoginPage;
