import { baseApi } from "../baseApi";

type UserProfile = {
  user: {
    name: string;
    email: string;
    isVerified: boolean;
    imageURL: string;
    subscriptions: {
      isActive: boolean;
    }[];
  };
};

type UpdateProfilePayload = {
  name?: string;
  image?: File;
};

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<UserProfile, UpdateProfilePayload>({
      query: (payload) => {
        const formData = new FormData();
        if (payload.name) formData.append("name", payload.name);
        if (payload.image) formData.append("image", payload.image);

        return {
          url: "/users/update-profile",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLazyGetProfileQuery,
} = userApi;
