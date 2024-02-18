"use client";

import { useJwtToken } from "@/context/useJWTToken";
import { useAdminLoginFetch } from "@/hooks/useAdminLoginFetch";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { adminLoginFetch } = useAdminLoginFetch();
    const { jwtToken } = useJwtToken();

    // すでにログイン状態であった場合はリダイレクト
    useEffect(() => {
        if (jwtToken) {
            console.log("ログイン済みです");
            // TODO: ログイン後のリダイレクト先を変更する
            router.push("/worker");
        }
    }, [jwtToken, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = await adminLoginFetch(email, password);

        if (!payload) {
            toast.error(
                "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
                {
                    icon: "❌",
                }
            );
            console.error("ログインに失敗しました");
            return;
        }

        toast.success("ログインに成功しました", {
            icon: "✅",
        });

        // TODO: ログイン後のリダイレクト先を変更する
        router.push("/worker");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-white rounded shadow-lg">
            <label className="flex flex-col space-y-1">
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
            </label>
            <label className="flex flex-col space-y-1">
                <span>Password:</span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
            </label>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
        </form>
    );
};
