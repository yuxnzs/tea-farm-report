"use client";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend,
} from "recharts";
import { useEffect, useState } from "react";

export default function DiseaseCountTable({
    diseaseData,
}: {
    diseaseData: Record<string, number>;
}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // 等 component mount 完才顯示圖表，確保在客戶端渲染，避免 hydration 錯誤
    }, []);

    if (!isClient) return null;

    const data = Object.entries(diseaseData).map(([name, count]) => ({
        disease: name,
        count,
    }));
    console.log(data);

    return (
        <div className="flex flex-row justify-between items-center p-4 w-full">
            <div className="w-[60%] min-w-0 overflow-x-auto rounded-xl shadow-md border border-gray-200 ml-7">
                <table className="w-full table-auto text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-gray-900">
                        <tr>
                            <th className="px-6 py-2.5 font-medium">
                                病害名稱
                            </th>
                            <th className="px-6 py-2.5 font-medium text-center">
                                發生次數
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-gray-200">
                        {Object.entries(diseaseData).map(
                            ([disease, count], index) => (
                                <tr
                                    key={disease}
                                    className={
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50 hover:bg-gray-100"
                                    }
                                >
                                    <td className="px-6 py-3.5">{disease}</td>
                                    <td className="px-6 py-3.5 text-center">
                                        {count}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <RadarChart outerRadius={140} width={550} height={280} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="disease" />
                <PolarRadiusAxis
                    angle={30}
                    domain={[0, Math.max(...data.map((d) => d.count))]} // 以最大發生次數為最大值
                />
                <Radar
                    name="發生次數"
                    dataKey="count"
                    stroke="#4ADE80"
                    fill="#4ADE80"
                    fillOpacity={0.6}
                />
                <Legend
                    formatter={() => (
                        <span className="font-bold">發生次數</span>
                    )}
                />
            </RadarChart>
        </div>
    );
}
