// redux/api/stripeApi.ts
import baseApi from "../baseApi";

export interface CreateCheckoutSessionArgs {
  priceId: string;
  planDuration: number;
  subscriberName?: string;
  subscriberEmail?: string;
}

interface CheckoutSessionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  url?: string;
  // sessionId?: string;
}

export const stripeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<
      CheckoutSessionResponse,
      CreateCheckoutSessionArgs
    >({
      query: (data) => ({
        url: "/stripe/stripe-checkout-session",
        method: "POST",
        body: data,
      }),
    }),
  }),
});


export const { useCreateCheckoutSessionMutation } = stripeApi;
