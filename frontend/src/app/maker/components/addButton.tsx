import { Maker } from "@/types/maker";

type AddButtonProps = {
    makers: Maker[];
    setMakers: (makers: Maker[]) => void;
    isAddButtonVisible: boolean;
    setIsAddButtonVisible: (isAddButtonVisible: boolean) => void;
};

export const AddButton = ({ makers, setMakers, isAddButtonVisible, setIsAddButtonVisible }: AddButtonProps) => {
    const handleAdd = async () => {
        const maker = {
            id: Math.random().toString(32),
            code_name: "",
            deleted: 0,
            changed: false,
            saved: false,
        };
        setMakers([...makers, maker]);
        setIsAddButtonVisible(false);
    };

    return (
        <button
            onClick={handleAdd}
            className={`p-2 bg-gray-800 text-white rounded-md ${isAddButtonVisible ? "" : "hidden"}`}
        >
            追加
        </button>
    );
};
