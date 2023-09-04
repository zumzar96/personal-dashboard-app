import { rootApiSlice } from "../root/rootApiSlice";

export const usersApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDeviceToken: builder.mutation({
      query(params) {
        return {
          url: `/users/devicetoken`,
          method: "POST",
          body: {
            ...params,
          },
        };
      },
    }),
    sendPushNotification: builder.mutation({
      query(params) {
        return {
          url: `/users/send-push-notification`,
          method: "POST",
          body: {
            ...params,
          },
        };
      },
    }),
  }),
});

export const { useAddDeviceTokenMutation, useSendPushNotificationMutation } = usersApiSlice;
