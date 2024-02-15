"use client";

import { FC, ReactNode, useCallback } from "react";
import { JwtContext } from "./CredentialContext";
import { JwtAdminPayloadType, IJwtAdminContext } from "../types/jwtType";
import { decode } from "js-base64";
import { useSessionStorage } from "./useSessionStorage";

const JwtProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [jwtToken, setJwtToken] = useSessionStorage<string | null>(
        "AdminJwtToken",
        null
    );

    const getJwtPayload = useCallback((): JwtAdminPayloadType | null => {
        if (!jwtToken) {
            console.debug("jwtToken is null");
            return null;
        }

        const payload = jwtToken.split(".")[1];
        const decodedPayload = decode(payload);
        return JSON.parse(decodedPayload);
    }, [jwtToken]);

    // JWTトークンを削除し、ログアウトする
    const deleteJwtTokenAndLogout = useCallback(() => {
        setJwtToken(null);
    }, [setJwtToken]);

    // コンテキストプロバイダの値
    const contextValue: IJwtAdminContext = {
        jwtToken,
        setJwtToken,
        getJwtPayload,
        deleteJwtTokenAndLogout,
    };

    return (
        <JwtContext.Provider value={contextValue}>{children}</JwtContext.Provider>
    );
};

export { JwtContext, JwtProvider };
