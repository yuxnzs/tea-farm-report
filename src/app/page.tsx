import ReportTitle from "@/components/report-title";
import GrowthAnalysis from "@/components/growth-analysis";
import { mockData } from "../../mock/mockData";
import DiseaseAnalysis from "@/components/disease-analysis";
import AiSuggestions from "@/components/ai-suggestions";
import "@/styles/app.scss";

interface areaData {
    area: string;
    originalImage: string;
    analyzedImage: string;
    date: string;
    weather: string;
    growth: string;
    plantingRate: string;
}

export default function Home() {
    const groupedAreaData: areaData[][] = [[], [], []];
    const areaToIndex: Record<string, number> = { A: 0, B: 1, C: 2 };

    mockData.map((dateData) => {
        dateData.teaData.forEach((areaData) => {
            groupedAreaData[areaToIndex[areaData.area]].push(areaData);
        });
    });

    // 所有區域合併後的資料
    const mergedData = mockData.map((entry) => {
        const item: Record<string, string | number> = {
            date: entry.teaData[0].date,
        };
        entry.teaData.forEach((d) => {
            item[d.area] = parseFloat(d.growth.replace("%", ""));
        });
        return item;
    }) as {
        date: string;
        A?: number;
        B?: number;
        C?: number;
    }[];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative w-[210mm] min-h-screen bg-white shadow-lg overflow-hidden pb-10">
                <ReportTitle title={mockData[0].teaGardenName} />
                <GrowthAnalysis
                    groupedAreaData={groupedAreaData}
                    areaToIndex={areaToIndex}
                    mergedData={mergedData}
                />
                <DiseaseAnalysis />
                <AiSuggestions />
            </div>
        </div>
    );
}
