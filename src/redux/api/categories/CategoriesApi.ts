import baseApi from "../baseApi";

export interface Category {
  id: string;
  name: string;
  _count: {
    questions: Number;
  };
  createdAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  categories: Category[];
}

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
