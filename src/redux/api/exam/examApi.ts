import baseApi from "../baseApi";

// ==================== Types ====================
type Mode = "REVISION" | "TIMED";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  explanation: string;
  imageUrl?: string;
  categoryId: string;
  correctOption: string;
  options: QuestionOption[];
}

interface GetQuestionsRequest {
  mode: Mode;
  selectedCategories: string[];
  filterOption: "ALL" | "UNSEEN" | "WRONG" | "WRONG_AND_UNSEEN";
  allowedTime: number;
  questionLimit: number;
  randomize: boolean;
}

export interface GetQuestionsResponse {
  success: boolean;
  examId: string;
  numQuestions: number;
  questions: Question[];
}

interface SubmitSingleQuestionRequest {
  examId: string;
  questionId: string;
  selectedOptionId: string;
  startTime: string;
  endTime: string;
  duration: number;
}

interface SubmitSingleQuestionResponse {
  success: boolean;
  message: string;
}

interface SubmitExamRequest {
  examId: string;
}

interface ExamResult {
  score: number;
  percentage: string;
  totalTimeTaken: number;
}

interface SubmitExamResponse {
  success: boolean;
  message: string;
  data: ExamResult;
}

interface QuestionBreakdownOption {
  optionText: string;
  isCorrectOption: boolean;
}

interface SelectedOption {
  text: string;
  isCorrect: boolean;
}

interface QuestionBreakdown {
  questionId: string;
  questionText: string;
  explanation: string;
  category: string;
  options: QuestionBreakdownOption[];
  selectedOption: SelectedOption;
  correctOption: string;
  timeTakenInSeconds: number;
}

interface ExamDetails {
  id: string;
  totalTimeTaken: number;
  numQuestions: number;
  score: number;
  allowedTime: number;
  percentage: number;
  questionBreakdown: QuestionBreakdown[];
}

interface GetExamDetailsResponse {
  success: boolean;
  exam: ExamDetails;
}


interface SubmitFeedbackRequest {
  id: string;
  text: string;
}

interface SubmitFeedbackResponse {
  success: boolean;
  message: string;
}

// ==================== API Endpoints ====================
export const examApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.mutation<GetQuestionsResponse, GetQuestionsRequest>({
      query: (body) => ({
        url: "/exams/get-questions",
        method: "POST",
        body,
      }),
    }),
    submitSingleQuestion: builder.mutation<
      SubmitSingleQuestionResponse,
      SubmitSingleQuestionRequest
    >({
      query: (body) => ({
        url: "/exams/submit/singleQuestion",
        method: "POST",
        body,
      }),
    }),
    submitExam: builder.mutation<SubmitExamResponse, SubmitExamRequest>({
      query: (body) => ({
        url: "/exams/submit",
        method: "POST",
        body,
      }),
    }),
    getExamDetails: builder.query<GetExamDetailsResponse, string>({
      query: (examId) => ({
        url: `/exams/details/${examId}`,
        method: "GET",
      }),
    }),
    submitFeedback: builder.mutation<SubmitFeedbackResponse, SubmitFeedbackRequest>({
      query: ({id, text}) => ({
        url: `/questions/feedback/${id}`,
        method: "POST",
        body: { text },
      })
    })
  }),
});

// ==================== Exports ====================
export const {
  useGetQuestionsMutation,
  useSubmitSingleQuestionMutation,
  useSubmitExamMutation,
  useGetExamDetailsQuery,
  useSubmitFeedbackMutation,
} = examApi;