import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Suzuya",
    description: "Suzuya item management system",
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja" className="bg-gray-50">
            <Providers>
                <body className="h-full">
                    {children}
                </body>
            </Providers>
        </html>
    );
}
