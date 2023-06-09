import { rootApiSlice } from "../root/rootApiSlice";

export const loginApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query(params) {
        return {
          url: `users/profile`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        };
      },
    }),
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
    logout: builder.mutation({
      query: () => ({
        url: `users/auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

export default loginApi;
