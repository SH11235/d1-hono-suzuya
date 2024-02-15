"use client";

import { useSyncExternalStore, useCallback } from "react";

export const useSessionStorage = <T,>(key: string, initialValue: T) => {
    const getStoredValue = useCallback(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    }, [key, initialValue]);

    const subscribe = useCallback(
        (notifyChange: () => void) => {
            const handleChange = (event: StorageEvent) => {
                if (event.key === key) {
                    notifyChange();
                }
            };
            window.addEventListener("storage", handleChange);
            return () => window.removeEventListener("storage", handleChange);
        },
        [key]
    );

    const getServerSnapshot = () => {
        return initialValue;
    };

    // セッションストレージの値と同期
    const value = useSyncExternalStore(subscribe, getStoredValue, getServerSnapshot);

    // セッションストレージに値を設定する関数
    const setValue = useCallback(
        (newValue: T) => {
            const stringifiedValue = JSON.stringify(newValue);
            sessionStorage.setItem(key, stringifiedValue);
        },
        [key]
    );

    return [value, setValue];
};
