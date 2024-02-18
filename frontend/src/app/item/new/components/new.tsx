import { useMakerFetch } from "@/app/maker/hooks/useMakerFetch";
import { useWorkerFetch } from "@/app/worker/hooks/useWorkerFetch";
import { useState } from "react";

export const NewTitle = () => {
    const { workers } = useWorkerFetch();
    const { makers } = useMakerFetch();

    const [releaseDate, setReleaseDate] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [listSubmissionDate, setListSubmissionDate] = useState("");
    const [guidanceDate, setGuidanceDate] = useState("");
    const [deadlineDate, setDeadlineDate] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [title, setTitle] = useState("");
    const [project, setProject] = useState("デフォルト");
    const [catalogStatus, setCatalogStatus] = useState("未着手");
    const [announcementStatus, setAnnouncementStatus] = useState("未着手");
    const [remarks, setRemarks] = useState("");

    const object = {
        releaseDate,
        deliveryDate,
        listSubmissionDate,
        guidanceDate,
        deadlineDate,
        orderDate,
        title,
        project,
    };

    return (
        <div className="flex flex-col items-center justify-start space-y-4 min-h-screen bg-gray-100 pt-10">
            <h1 className="text-3xl font-bold">新規アイテム登録</h1>
            <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">入荷日：</p>
                    <input className="flex-1" type="date" placeholder="yyyy-mm-dd" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">納品日：</p>
                    <input className="flex-1" type="date" placeholder="yyyy-mm-dd" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">リスト提出日：</p>
                    <input className="flex-1" type="date" placeholder="yyyy-mm-dd" value={listSubmissionDate} onChange={(e) => setListSubmissionDate(e.target.value)} />
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">解禁日：</p>
                    <input className="flex-1" type="date" placeholder="yyyy-mm-dd" value={guidanceDate} onChange={(e) => setGuidanceDate(e.target.value)} />
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">締切日：</p>
                    <input className="flex-1" type="date" placeholder="yyyy-mm-dd" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} />
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">発注日：</p>
                    <input className="flex-1" type="date" placeholder="yyyy-mm-dd" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">タイトル：</p>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">案件：</p>
                    <select className="flex-1" value={project} onChange={(e) => setProject(e.target.value)}>
                        <option value="デフォルト">デフォルト</option>
                        <option value="S案件">S案件</option>
                        <option value="Y案件">Y案件</option>
                        <option value="再販">再販</option>
                    </select>
                </div>
                {/* item detail component */}
                <div>
                    TODO Item Detail Component !!!!!
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">カタログ：</p>
                    <select className="flex-1" value={catalogStatus} onChange={(e) => setCatalogStatus(e.target.value)}>
                        <option value="未着手">未着手</option>
                        <option value="不要">不要</option>
                        <option value="作成中">作成中</option>
                        <option value="作成済み">作成済み</option>
                    </select>
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">告知：</p>
                    <select className="flex-1" value={announcementStatus} onChange={(e) => setAnnouncementStatus(e.target.value)}>
                        <option value="未着手">未着手</option>
                        <option value="不要">不要</option>
                        <option value="作成中">作成中</option>
                        <option value="作成済み">作成済み</option>
                    </select>
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-right w-28">備考：</p>
                    <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                </div>
                {/* TODO 登録ボタン */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => console.log(object)}>登録</button>
            </div>
        </div >
    );
};
