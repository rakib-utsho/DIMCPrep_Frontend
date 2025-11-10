import baseApi from "../baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendFeedback: builder.mutation({
      query: (feedbackData) => ({
        url: "/send-feedback",
        method: "POST",
        body: feedbackData,
      }),
    }),
  }),
});

export const { useSendFeedbackMutation } = contactApi;