import Image from "next/image";
import MainTitle from "@/components/main-title";
import AreaGrowthChart from "@/components/area-growth-chart";
import MultiAreaGrowthChart from "@/components/multi-area-growth-chart";

interface areaData {
    area: string;
    originalImage: string;
    analyzedImage: string;
    date: string;
    weather: string;
    growth: string;
    plantingRate: string;
}

interface Props {
    groupedAreaData: areaData[][];
    areaToIndex: Record<string, number>;
    mergedData: {
        date: string;
        A?: number;
        B?: number;
        C?: number;
    }[];
}

export default function GrowthAnalysis({
    groupedAreaData,
    areaToIndex,
    mergedData,
}: Props) {
    return (
        <div className="global-margin mt-35">
            <h1 className="text-2xl md:text-3xl font-bold">生長情形分析歷史</h1>
            <div className="flex flex-col gap-10 mt-4">
                {groupedAreaData.map((data, areaIndex) => {
                    // 透過 index 反查詢區域名稱
                    const areaName = Object.keys(areaToIndex).find(
                        (key) => areaToIndex[key] === areaIndex
                    );

                    const numFormattedData = data.map((item) => ({
                        date: item.date,
                        growth: parseFloat(item.growth.replace("%", "")), // 把 "73.25%" 變成 73.25
                    }));

                    return (
                        <div
                            key={areaIndex}
                            className="flex flex-wrap justify-between"
                        >
                            <MainTitle title={`${areaName} 區分析結果`} />
                            {data.map((areaData, index) => {
                                return (
                                    // 茶園卡片
                                    <div
                                        key={index}
                                        className="flex flex-col w-55 bg-gray-100 rounded-md overflow-hidden hover:bg-gray-200 transition-colors duration-300"
                                    >
                                        {/* 圖片與日期 */}
                                        <div className="w-full h-30 overflow-hidden relative">
                                            <Image
                                                src={areaData.originalImage}
                                                alt="aiPlantingImages"
                                                width={500}
                                                height={500}
                                                className="w-full h-30 object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            <p className="absolute bottom-0 font-bold px-2 text-white text-shadow-md w-full bg-gradient-to-t from-black/70">
                                                {areaData.date}
                                                &nbsp;
                                                {" • "}
                                                &nbsp;
                                                {areaData.weather}
                                            </p>
                                        </div>
                                        {/* 生長情形 */}
                                        <div className="flex flex-col items-start justify-around font-bold px-2 py-2 text-gray-800">
                                            <h2>
                                                生長情形：
                                                {areaData.growth}
                                                &nbsp;
                                                {" • "}
                                                &nbsp;
                                                {areaData.plantingRate}
                                            </h2>
                                        </div>
                                    </div>
                                );
                            })}
                            {<AreaGrowthChart data={numFormattedData} />}
                        </div>
                    );
                })}
            </div>
            <MainTitle title="各區域成長綜合對比" marginTop={40} />
            <MultiAreaGrowthChart data={mergedData} />
        </div>
    );
}
