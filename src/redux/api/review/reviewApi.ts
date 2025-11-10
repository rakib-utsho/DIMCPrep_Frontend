import baseApi from "../baseApi";

// TypeScript Types
export interface Review {
  id: string;
  review: string;
  rating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isVisible: boolean;
  user: {
    id: string;
    name: string;
    imageURL: string;
  };
}

export interface ReviewAverage {
  _avg: {
    rating: number;
  };
}

export interface ReviewPayload {
  review: string;
  rating: number;
}

export interface ReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  average: ReviewAverage;
  reviews: Review[];
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<ReviewResponse, ReviewPayload>({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
    getAllReviews: builder.query<ReviewResponse, void>({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetAllReviewsQuery } = reviewApi;
