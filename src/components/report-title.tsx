export default function ReportTitle({ title }: { title: string }) {
    return (
        <div className="flex justify-end bg-gray-900 mt-10 pl-[1rem] rounded-[0.5rem] absolute top-0 left-[-1rem]">
            <h1 className="text-2xl md:text-4xl font-bold text-white px-8 py-4">
                {title + " 茶園生長健康報告"}
            </h1>
        </div>
    );
}
