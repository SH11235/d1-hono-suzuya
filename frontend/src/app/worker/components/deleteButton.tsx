import { SuzuyaWorker } from "@/types/worker";
import { useWorkerFetch } from "../hooks/useWorkerFetch";

type DeleteButtonProps = {
    worker: SuzuyaWorker;
    setWorkers: React.Dispatch<React.SetStateAction<SuzuyaWorker[]>>;
};

export const DeleteButton = ({ worker, setWorkers }: DeleteButtonProps) => {
    const { deleteWorker } = useWorkerFetch();

    const handleDelete = async () => {
        if (!confirm("削除しますか？")) {
            return;
        }
        await deleteWorker.mutateAsync(worker.id);
        setWorkers((prev) => prev.filter((w) => w.id !== worker.id));
    };

    if (worker.saved) {
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
