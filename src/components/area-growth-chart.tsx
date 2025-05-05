"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

interface Props {
    data: {
        date: string;
        growth: number;
    }[];
}

export default function AreaGrowthChart({ data }: Props) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // 等 component mount 完才顯示圖表，確保在客戶端渲染，避免 hydration 錯誤
    }, []);

    if (!isClient) return null;

    return (
        <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{
                top: 40,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
            <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#4ADE80" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis
                dataKey="date"
                tick={{ fontSize: 14, fontWeight: "bold", fill: "#555" }}
                tickMargin={10}
                axisLine={{ stroke: "#ccc" }}
                tickLine={{ stroke: "#ccc" }}
            />
            <YAxis
                tick={{ fontSize: 14, fontWeight: "bold", fill: "#555" }}
                axisLine={{ stroke: "#ccc" }}
                tickLine={{ stroke: "#ccc" }}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <Tooltip
                contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    fontSize: 14,
                }}
                labelStyle={{
                    fontWeight: "bold",
                    color: "#333",
                }}
                formatter={(value) => [`${value}%`, "生長率"]}
            />
            <Area
                type="monotone"
                dataKey="growth"
                stroke="#4ADE80"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGrowth)"
                dot={{ stroke: "#4ADE80", strokeWidth: 2, r: 4, fill: "#fff" }}
                activeDot={{ r: 6 }}
                label={{
                    position: "top",
                    dy: -8,
                    fontSize: 12,
                    fill: "#4ADE80",
                    formatter: (value: number) => `${value}%`,
                }}
            />
        </AreaChart>
    );
}
