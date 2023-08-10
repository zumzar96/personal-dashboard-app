import { rootApiSlice } from "../root/rootApiSlice";

export const authApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query(params) {
        return {
          url: `users/login`,
          method: "POST",
          body: {
            email: params.email,
            password: params.password,
          },
        };
      },
    }),
    register: builder.mutation({
      query(params) {
        return {
          url: `users/`,
          method: "POST",
          body: {
            name: params.name,
            email: params.email,
            password: params.password,
          },
        };
      },
    }),
    emailForgotPass: builder.mutation({
      query(params) {
        return {
          url: `users/forgotpass`,
          method: "POST",
          body: {
            email: params.email,
          },
        };
      },
    }),
    resetPass: builder.mutation({
      query(params) {
        return {
          url: `users/resetpass`,
          method: "POST",
          body: {
            password: params.password,
            token:params.token,
          },
        };
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `users/auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

export default authApi;

export const {
  useResetPassMutation,
  useEmailForgotPassMutation,
  useLoginMutation,
  useRegisterMutation,
} = authApi;
