"use client";

import { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { useGetUserPerformanceByDateQuery } from "@/redux/api/MyTestPerformance/MyTestPerformance";
import { Loader } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Category {
  categoryName: string;
  totalQuestions: number;
  correctAnswers: number;
  performancePercentage: number;
}

interface Performance {
  date: string;
  categories: Category[];
}

interface UserPerformanceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  performance: Performance[];
}

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 10,
        callback: (value) => value + "%",
      },
      grid: {
        display: true,
      },
    },
    x: {
      grid: {
        display: true,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 12,
        padding: 20,
        font: {
          size: 12,
        }
      }
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.parsed.y}%`,
      },
    },
  },
};

export default function ProfilePerformanceChart() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pass the dateFilter directly to the query
  const { data: filteredData, error: fetchError, isLoading: fetchLoading } = useGetUserPerformanceByDateQuery({ date: dateFilter });

  const allDates = filteredData?.performance.map((entry) => entry.date) ?? [];

  const allCategories = useMemo(
    () => [
      ...new Set(filteredData?.performance.flatMap((entry) => entry.categories.map((category) => category.categoryName))),
    ],
    [filteredData]
  );

  useEffect(() => {
    if (allCategories.length > 0) {
      if (selectedCategories.length === 0) {
        setSelectedCategories([allCategories[0]]);
      } else {
        const validSelected = selectedCategories.filter(cat => allCategories.includes(cat));
        if (validSelected.length === 0) {
          setSelectedCategories([allCategories[0]]);
        }
      }
    }
  }, [allCategories]);

  const chartData = useMemo(() => {
    const colorPalette = ["#F9D776", "#C8A5F7", "#76D7C4", "#FF9AA2", "#A4DEF9", "#FFB347"];
    const labels = filteredData?.performance.map((entry) => entry.date) ?? [];
  
    const datasets = selectedCategories.map((categoryName, idx) => {
      const data = filteredData?.performance.map((entry) => {
        const category = entry.categories.find((cat) => cat.categoryName === categoryName);
        return category ? category.performancePercentage : null;
      });
  
      return {
        label: categoryName,
        data,
        fill: false,
        borderColor: colorPalette[idx % colorPalette.length],
        backgroundColor: colorPalette[idx % colorPalette.length],
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        spanGaps: true,
      };
    });
  
    return {
      labels,
      datasets,
    };
  }, [filteredData, selectedCategories]);

  const handleToggleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((cat) => cat !== name) : [...prev, name]
    );
  };

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFilter(e.target.value); // Triggers re-fetching of the data
  };

  if (fetchLoading) return (
    <div className="flex justify-center items-center min-h-[300px]">
      <Loader className="animate-spin h-8 w-8 text-primary" />
    </div>
  );
  
  if (fetchError || !filteredData) return (
    <div className="text-center py-10 text-red-600">
      Error loading performance data
    </div>
  );

  return (
    <div className="bg-[#F1FCFB] p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-4">
          <h2 className="text-lg md:text-xl font-medium text-gray-800">
            Progress Over Time
          </h2>
          
          <div className="w-full md:w-auto">
            <select
              id="date-filter"
              value={dateFilter}
              onChange={handleDateFilterChange}
              className="cursor-pointer w-full md:w-[180px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            >
              <option value="all">All Dates</option>
              <option value="1">Last Month</option>
              <option value="3">Last 3 Months</option>
            </select>
          </div>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3 mb-6`}>
          {allCategories.map((name) => (
            <button
              key={name}
              onClick={() => handleToggleCategory(name)}
              className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                selectedCategories.includes(name)
                  ? "bg-amber-100 text-amber-800 font-medium"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${
                selectedCategories.includes(name) ? "bg-amber-500" : "bg-gray-400"
              }`}></span>
              {name}
            </button>
          ))}
        </div>

        {selectedCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <p className="text-center">Select categories to view performance data</p>
          </div>
        ) : (
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] w-full">
            <Line 
              data={chartData} 
              options={chartOptions} 
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
