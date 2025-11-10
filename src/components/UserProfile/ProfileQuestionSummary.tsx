'use client'

import { useState } from "react"
import { Line, Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from "chart.js"
import { useGetPerformanceHistrogramChartQuery, useGetUserScoreSummaryQuery } from "@/redux/api/MyTestPerformance/MyTestPerformance"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const baseColors = [
    "#BDEBDF", "#B1E6D9", "#B4E7DB", "#B4E7DB", "#B4E7DB",
    "#9BD7C7", "#A4DED1", "#76C1AE", "#62B9A6", "#5EB7A5",
    "#32917D", "#32917D", "#32917D", "#32917D", "#32917D",
    "#32917D", "#32917D", "#32917D", "#32917D", "#32917D",
]

const histogramOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            grid: { display: false },
            border: { display: true },
            ticks: { display: false },
        },
        x: {
            grid: { display: false },
            border: { display: true },
        },
    },
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
    },
}

const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 10 },
            grid: { display: true },
            border: { display: false },
        },
        x: {
            grid: { display: true },
            border: { display: false },
        },
    },
    plugins: {
        legend: { display: false },
    },
}

export default function ProfileQuestionSummary() {
    const [timeFilter, setTimeFilter] = useState("all")
    const { data, isLoading } = useGetPerformanceHistrogramChartQuery()
    const { data: scoreSummaryData, isLoading: scoreLoading } = useGetUserScoreSummaryQuery({ timeFilter });

    const userScore = parseFloat(
        String((data as any)?.userAverageScore ?? "0").replace('%', '')
    ) || 0

    const otherUsersScore = parseFloat(
        String((data as any)?.userComparison?.otherUsersAverageScore ?? "0")
    ) || 0

    const fullHistogram = Array.isArray((data as any)?.histogram)
        ? (data as any).histogram
        : new Array(20).fill(0)

    const histogramLabels = Array.from({ length: 20 }, (_, i) => `${(i + 1) * 5}%`)

    const highlightedIndex = Math.min(histogramLabels.length - 1, Math.floor(userScore / 5) - 1)
    const barColors = fullHistogram.map((_: number, i: number) =>
        i === highlightedIndex ? "#1D9A82" : baseColors[i % baseColors.length]
    )

    const histogramData: ChartData<"bar", number[], string> = {
        labels: histogramLabels,
        datasets: [
            {
                label: "User Scores",
                data: fullHistogram,
                backgroundColor: barColors,
                borderWidth: 1,
                borderRadius: 2,
                barThickness: 'flex',
                categoryPercentage: 1.0,
                barPercentage: 1.0,
            },
        ],
    }

    const lineChartData: ChartData<"line", number[], string> = {
        labels: (scoreSummaryData as any)?.groupedData?.map((item: any) =>
            new Date(item.date).toLocaleDateString("en-GB")
        ) || [],
        datasets: [
            {
                label: "Score",
                data: (scoreSummaryData as any)?.groupedData?.map((item: any) => item.totalScore) || [],
                borderColor: "#1D9A82",
                backgroundColor: "#1D9A82",
                tension: 0.3,
                pointRadius: 4,
            },
        ],
    }

    return (
        <div className="min-h-screen bg-[#F1FCFB] flex flex-col items-center justify-center p-4 gap-4 lg:mb-48 mb-24">

            <div className="w-full max-w-[1300px] bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-[35px] sm:text-[30px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-medium text-center mb-6 text-teal-500">
                    Performance - question summary
                </h2>

                <div className="mb-6">
                    <p className="text-[22px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] mb-2">
                        Your average score is <strong>{userScore}%</strong> after answering <strong>{(data as any)?.totalQuestionsAnswered ?? 0}</strong> questions. The average score of registered users is <strong>{otherUsersScore}%</strong>.
                    </p>

                    <div className="w-full bg-gray-200 rounded-full overflow-hidden h-[20px] mt-[63px]">
                        <div className="flex h-full">
                            <div className="h-full bg-[#75E0A7] rounded-l-full" style={{ width: `${userScore}%` }}></div>
                            <div className="h-full bg-red-300" style={{ width: "10%" }}></div>
                            <div className="h-full bg-gray-300 rounded-r-full" style={{ width: `${100 - userScore - 10}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-[22px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] mb-4">
                        Your score of <strong>{userScore}%</strong> puts you on the <strong>67th percentile</strong> of registered users. The histogram below shows the scores of other users.
                    </p>

                    <div className="relative h-[200px] w-full mt-20">
                        <Bar data={histogramData} options={histogramOptions} />

                        <div
                            className="absolute p-[2px] top-0 bottom-0 w-px h-[86%] bg-black"
                            style={{
                                left: `${userScore}%`,
                                transform: 'translateX(-50%)',
                                zIndex: 10
                            }}
                        >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[16px] font-bold whitespace-nowrap">
                                Your Score
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[1300px] bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-20">
                <h2 className="text-teal-500 text-center text-2xl sm:text-4xl font-[600] mb-12">
                    Performance - score summary
                </h2>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2 sm:gap-0">
                    <div></div>
                    <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 cursor-pointer"
                    >
                        <option value="all">All</option>
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                    </select>
                </div>

                <div className="h-[250px] sm:h-[300px] w-full">
                    <Line data={lineChartData} options={lineChartOptions} />
                </div>
            </div>
        </div>
    )
}
