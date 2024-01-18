import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Suzuya",
    description: "Suzuya item management system",
};

interface LayoutProps {
    children: React.ReactNode;
    currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ currentPage, children }) => (
    <html lang="ja" className="p-x-[4%]">
        <body className={inter.className} >
            <header className="header-link bg-blue-500 text-white p-4">
                <ul className="flex space-x-4 justify-center">
                    <li>
                        <Link
                            href="/item_list"
                            className={`link-button ${
                                currentPage === "item_list" ? "underline" : ""
                            }`}
                        >
                            ItemList
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/item_new"
                            className={`link-button ${
                                currentPage === "item_new" ? "underline" : ""
                            }`}
                        >
                            ItemNew
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/maker_list"
                            className={`link-button ${
                                currentPage === "maker_list" ? "underline" : ""
                            }`}
                        >
                            MakerList
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/worker_list"
                            className={`link-button ${
                                currentPage === "worker_list" ? "underline" : ""
                            }`}
                        >
                            WorkerList
                        </Link>
                    </li>
                </ul>
            </header>
            {children}
        </body>
    </html>
);

export default Layout;
