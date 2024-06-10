import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const UserAdapter = createEntityAdapter({});

const initialState = UserAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
    }),
    getOneOrder: builder.mutation({
      query: ({ orderId }) => ({
        url: `/user/order/${orderId}`,
        method: "GET",
      }),
    }),
    gall: builder.mutation({
      query: () => ({
        url: `/user/orders/all`,
        method: "GET",
      }),
    }),
    ////////////////

    // //////
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/Product",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    orderUpdate: builder.mutation({
      query: (initialUserData) => ({
        url: "/user/orderUpDate",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    removeOrder: builder.mutation({
      query: (initialUserData) => ({
        url: "/user/removeOrder",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    loved: builder.mutation({
      query: (initialUserData) => ({
        url: "/user/addTofavorite",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    order: builder.mutation({
      query: (initialUserData) => ({
        url: "/user/order",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    spacail: builder.mutation({
      query: (initialUserData) => ({
        url: "/user/spOrder",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),

    unloved: builder.mutation({
      query: (initialUserData) => ({
        url: "/user/removeFromFavorite",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteSporder: builder.mutation({
      query: ({ id }) => ({
        url: `/Spdeleter/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    setSub: builder.mutation({
      query: (initialUserData) => ({
        url: "/subscribe",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    sendSub: builder.mutation({
      query: (initialUserData) => ({
        url: "/subsend",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    gatsub: builder.mutation({
      query: () => ({
        url: "/subAll",
        method: "GET",
      }),
    }),
    getAllSp: builder.mutation({
      query: () => ({
        url: "/Spgeter",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserMutation,
  useAddNewUserMutation,
  useLovedMutation,
  useUnlovedMutation,
  useOrderMutation,
  useGetOneOrderMutation,
  useGallMutation,
  useRemoveOrderMutation,
  useOrderUpdateMutation,
  useSetSubMutation,
  useGatsubMutation,
  useSendSubMutation,
  useSpacailMutation,
  useGetAllSpMutation,
  useDeleteSporderMutation,

  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;

// returns the query result object
export const selectUserResult = userApiSlice.endpoints.getUser.select();

// creates memoized selector
const selectUserData = createSelector(
  selectUserResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = UserAdapter.getSelectors((state) => selectUserData(state) ?? initialState);
