import { SuzuyaWorker } from "@/types/worker";
import { useWorkerFetch } from "../hooks/useWorkerFetch";

type SaveButtonProps = {
    worker: SuzuyaWorker
};

export const UpdateButton = ({ worker }: SaveButtonProps) => {
    const { updateWorker } = useWorkerFetch();

    const handleUpdate = async () => {
        await updateWorker.mutateAsync({ ...worker });
    };


    if (!worker.changed) {
        return (
            <button className="p-2 bg-gray-400 text-white rounded-md" disabled>
                保存
            </button>
        );
    } else {
        return (
            <button onClick={handleUpdate} className="p-2 bg-gray-800 text-white rounded-md">
                保存
            </button>
        );
    }
};
