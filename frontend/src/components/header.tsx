import Link from "next/link";

export const Header = () => {
    return (
        <div className="flex items-center justify-center space-x-4 p-4 bg-gray-800 text-white">
            <Link href="/item">
                アイテム一覧
            </Link>
            <Link href="/item/new">
                アイテム登録
            </Link>
            <Link href="/worker">
                担当者一覧
            </Link>
            <Link href="/maker">
                メーカー一覧
            </Link>
        </div>
    );
};
