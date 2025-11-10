import baseApi from "../baseApi";

export interface BasicPerformance {
  totalExams: number;
  averageScore: string;
  userAverageScore: string; // Keep this as string to match the API response
  totalTimeTakenInMinutes: string;
}

export interface PerformanceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: BasicPerformance;
}

export interface Category {
  categoryName: string;
  totalQuestions: number;
  correctAnswers: number;
  performancePercentage: number;
}

export interface Performance {
  date: string;
  categories: Category[];
  totalTimeTakenInSeconds: number;
  averageScore: string;
  totalTests: number;
  totalExams: string;
}

export interface UserPerformanceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  performance: Performance[];
}

export interface UserComparison {
  userAverageScore: string; // userAverageScore is a string in the API response
  otherUsersAverageScore: string;
}

export interface BasicUserExamInfo {
  success: boolean;
  totalQuestionsAnswered: number;
  userComparison: UserComparison; // userAverageScore is here
  histogram: number[];
}

export interface ScoreEntry {
  date: string;
  totalScore: number;
}

export interface UserScoreSummaryResponse {
  success: boolean;
  groupedData: ScoreEntry[];
  statusCode: number;
  message: string;
}
export interface UserTestHistory {
  id: string;
  userId: string;
  mode: string;
  numOFQuestions: number;
  allowedTime: number;
  score: number;
  percentage: number;
  startedAt: string;
  categories: string[]; 
}

export interface UserTestHistoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  exams: UserTestHistory[];
}


export const performanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPerformance: builder.query<PerformanceResponse, void>({
      query: () => ({
        url: "/users/basic-user-exam-info",
        method: "GET",
      }),
    }),

    getPerformanceHistrogramChart: builder.query<BasicUserExamInfo, void>({
      query: () => ({
        url: `/users/getUserExamStatistics`,
        method: "GET",
      }),
    }),

    getUserScoreSummary: builder.query<UserScoreSummaryResponse, {timeFilter: string}>({
      query: ({timeFilter}) => ({
        url: `/users/getUserScoreSummary?filterBy=${timeFilter}`,
        method: "GET",
      }),
    }),

    getUserPerformanceByDate: builder.query<UserPerformanceResponse, { date: string }>({
      query: ({ date }) => ({
        url: `/users/getUserPerformanceByDate?filterBy=${date}`,
        method: "GET",
      }),
    }),
    getTestHistory: builder.query<UserTestHistoryResponse, void>({
      query: () => ({
        url: '/users/exams-history',
        method: 'GET'
      })
    })
  }),
});

export const {
  useGetPerformanceQuery,
  useGetPerformanceHistrogramChartQuery,
  useGetUserScoreSummaryQuery,
  useGetUserPerformanceByDateQuery,
  useGetTestHistoryQuery
} = performanceApi;
