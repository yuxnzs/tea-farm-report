"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { useEffect, useState } from "react";

interface MultiAreaGrowth {
    date: string;
    A?: number;
    B?: number;
    C?: number;
}

interface Props {
    data: MultiAreaGrowth[];
}

export default function MultiAreaGrowthChart({ data }: Props) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // 等 component mount 完才顯示圖表，確保在客戶端渲染，避免 hydration 錯誤
    }, []);

    if (!isClient) return null;

    const keys = Object.keys(data[0]).filter((key) => key !== "date");
    const colors = ["#60A5FA", "#F59E0B", "#A78BFA", "#E879F9", "#F43F5E"];

    return (
        <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{
                top: 0,
                right: 30,
                left: -19,
                bottom: 0,
            }}
        >
            <defs>
                {keys.map((key, index) => (
                    <linearGradient
                        key={key}
                        id={`color${key}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor={colors[index % colors.length]}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="100%"
                            stopColor={colors[index % colors.length]}
                            stopOpacity={0}
                        />
                    </linearGradient>
                ))}
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
                formatter={(value, name) => [`${value}%`, `區域 ${name}`]}
                labelFormatter={(label) => `日期：${label}`}
            />
            <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontWeight: "bold", fontSize: 14 }}
            />
            {keys.map((key, index) => (
                <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={colors[index % colors.length]}
                    strokeWidth={3}
                    fill={`url(#color${key})`}
                    fillOpacity={1}
                    dot={{
                        stroke: colors[index % colors.length],
                        strokeWidth: 2,
                        r: 4,
                        fill: "#fff",
                    }}
                    activeDot={{ r: 6 }}
                />
            ))}
        </AreaChart>
    );
}
