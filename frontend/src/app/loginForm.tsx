"use client";

import React, { useState } from "react";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const url = process.env.NEXT_PUBLIC_API_URL + "/admin-login";
        console.log(url);
        const data = { email, password };
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                // localStorage.setItem("token", data.token);
                // window.location.href = "/admin";
            })
            .catch((error) => {
                console.error("Error:", error);
            });
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
