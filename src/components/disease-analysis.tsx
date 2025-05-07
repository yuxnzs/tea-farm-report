import MainTitle from "@/components/main-title";
import { diseaseMockData } from "../../mock/mockData";
import DiseaseCountTable from "@/components/disease-count-table";

export default function DiseaseAnalysis() {
    // 統計病害發生次數
    const diseaseCountData: Record<string, number> = {};
    diseaseMockData.forEach((disease) => {
        diseaseCountData[disease.disease] =
            (diseaseCountData[disease.disease] || 0) + 1;
    });

    return (
        <div className="global-margin mt-10">
            <h1 className="text-2xl md:text-3xl font-bold">病害情形分析歷史</h1>
            <MainTitle title="2024 病害發生統計" marginTop={20} />
            <DiseaseCountTable diseaseData={diseaseCountData} />
        </div>
    );
}
