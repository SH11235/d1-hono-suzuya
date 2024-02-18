import { SuzuyaWorker } from "@/types/worker";

type AddButtonProps = {
    workers: SuzuyaWorker[];
    setWorkers: (workers: SuzuyaWorker[]) => void;
    isAddButtonVisible: boolean;
    setIsAddButtonVisible: (isAddButtonVisible: boolean) => void;
};

export const AddButton = ({ workers, setWorkers, isAddButtonVisible, setIsAddButtonVisible }: AddButtonProps) => {
    const handleAdd = async () => {
        const worker = {
            id: Math.random().toString(32),
            name: "",
            deleted: 0,
            changed: false,
            saved: false,
        };
        setWorkers([...workers, worker]);
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
