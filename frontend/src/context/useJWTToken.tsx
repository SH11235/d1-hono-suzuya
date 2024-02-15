"use client";

import { useContext } from "react";
import { JwtContext } from "./CredentialContext";

export const useJwtToken = () => {
    const context = useContext(JwtContext);

    if (context === undefined) {
        throw new Error("useJwtToken must be used within a JwtProvider");
    }

    return context;
};
