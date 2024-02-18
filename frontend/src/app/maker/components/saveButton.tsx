import { useMakerFetch } from "../hooks/useMakerFetch";
import { Maker } from "@/types/maker";

type SaveButtonProps = {
    maker: Maker;
    setIsAddButtonVisible: (value: boolean) => void;
    setMakers: React.Dispatch<React.SetStateAction<Maker[]>>;
};

export const SaveButton = ({ maker, setIsAddButtonVisible, setMakers }: SaveButtonProps) => {
    const { addMaker, updateMaker } = useMakerFetch();

    const handleSave = async () => {
        const response = await addMaker.mutateAsync(maker.code_name);
        setIsAddButtonVisible(true);
        setMakers((prev) => prev.map((w) => {
            if (w.id === maker.id) {
                return { ...w, id: response.id, changed: false, saved: true };
            }
            return w;
        }));
    };

    const handleUpdate = async () => {
        await updateMaker.mutateAsync(
            {
                id: maker.id,
                code_name: maker.code_name,
            }
        );
        setMakers((prev) => prev.map((w) => {
            if (w.id === maker.id) {
                return { ...w, changed: false, saved: true };
            }
            return w;
        }));
    };

    if (!maker.saved) {
        return (
            <button
                onClick={handleSave}
                className={"p-2 bg-gray-800 text-white rounded-md"}
            >
                保存
            </button>
        );
    } else if (maker.changed) {
        return (
            <button
                onClick={handleUpdate}
                className={"p-2 bg-gray-800 text-white rounded-md"}
            >
                保存
            </button>
        );
    } else {
        return (
            <button
                className={"p-2 bg-gray-400 text-white rounded-md"}
                disabled
            >
                保存
            </button>
        );
    }
};
