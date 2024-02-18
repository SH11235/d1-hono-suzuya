import { Maker } from "@/types/maker";
import { useMakerFetch } from "../hooks/useMakerFetch";

type DeleteButtonProps = {
    maker: Maker;
    setMakers: React.Dispatch<React.SetStateAction<Maker[]>>;
};

export const DeleteButton = ({ maker, setMakers }: DeleteButtonProps) => {
    const { deleteMaker } = useMakerFetch();

    const handleDelete = async () => {
        if (!confirm("削除しますか？")) {
            return;
        }
        await deleteMaker.mutateAsync(maker.id);
        setMakers((prev) => prev.filter((w) => w.id !== maker.id));
    };

    if (maker.saved) {
        return (
            <button onClick={handleDelete} className="p-2 bg-red-800 text-white rounded-md">
                削除
            </button>
        );
    } else {
        return (
            <button className="p-2 bg-gray-400 text-white rounded-md" disabled>
                削除
            </button>
        );
    }
};
