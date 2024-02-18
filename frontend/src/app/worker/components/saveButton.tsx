import { useWorkerFetch } from "../hooks/useWorkerFetch";
import { SuzuyaWorker } from "@/types/worker";

type SaveButtonProps = {
    worker: SuzuyaWorker;
    setIsAddButtonVisible: (value: boolean) => void;
    setWorkers: React.Dispatch<React.SetStateAction<SuzuyaWorker[]>>;
};

export const SaveButton = ({ worker, setIsAddButtonVisible, setWorkers }: SaveButtonProps) => {
    const { addWorker, updateWorker } = useWorkerFetch();

    const handleSave = async () => {
        const response = await addWorker.mutateAsync(worker.name);
        setIsAddButtonVisible(true);
        setWorkers((prev) => prev.map((w) => {
            if (w.id === worker.id) {
                return { ...w, id: response.id, changed: false, saved: true };
            }
            return w;
        }));
    };

    const handleUpdate = async () => {
        await updateWorker.mutateAsync(
            {
                id: worker.id,
                name: worker.name,
            }
        );
        setWorkers((prev) => prev.map((w) => {
            if (w.id === worker.id) {
                return { ...w, changed: false, saved: true };
            }
            return w;
        }));
    };

    if (!worker.saved) {
        return (
            <button
                onClick={handleSave}
                className={"p-2 bg-gray-800 text-white rounded-md"}
            >
                保存
            </button>
        );
    } else if (worker.changed) {
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
