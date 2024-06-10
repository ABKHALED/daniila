import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const ProductAdapter = createEntityAdapter({});

const initialState = ProductAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProdcuts: builder.query({
      query: () => "/product",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      // transformResponse: (responseData) => {
      //   const loadedProducts = responseData.map((product) => {
      //     product.id = product._id;
      //     return product;
      //   });
      //   return ProductAdapter.setAll(initialState, loadedProducts);
      // },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Product", id })),
          ];
          // return [
          //   { type: "Product", id: "LIST" },
          //   ...result.ids.map((id) => ({ type: "Product", id })),
          // ];
        } else return [{ type: "Product", id: "LIST" }];
      },
    }),
    addNewProduct: builder.mutation({
      query: (credentials) => ({
        url: "/Product/create",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    getOneProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/Product/${id}`,
        method: "GET",
      }),
    }),
    addHero: builder.mutation({
      query: (credentials) => ({
        url: "/Product/hero",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    getHero: builder.mutation({
      query: () => ({
        url: `/Product/getHero`,
        method: "GET",
      }),
    }),
    getfilterd: builder.mutation({
      query: ({ ProdFamily, ProductCat, ProductSub }) => ({
        url: `/Product/filterd/${ProdFamily}/${ProductCat}/${ProductSub}`,
        method: "GET",
      }),
    }),
    byFamily: builder.mutation({
      query: ({ ProdFamily }) => ({
        url: `/Product/productFamily/${ProdFamily}`,
        method: "GET",
      }),
    }),
    liked: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/Product/like/${id}`,
        method: "POST",
        body: {
          userId: userId,
        },
      }),
    }),
    acomment: builder.mutation({
      query: ({ id, userId, comment }) => ({
        url: `/Product/comment/${id}`,
        method: "POST",
        body: {
          userId: userId,
          comment: comment,
        },
      }),
    }),
    dcomment: builder.mutation({
      query: ({ id, userId, commentId }) => ({
        url: `/Product/deletComment/${id}`,
        method: "POST",
        body: {
          userId: userId,
          commentId: commentId,
        },
      }),
    }),
    updateProduct: builder.mutation({
      query: (initialProductData) => ({
        url: `/Product/update/${initialProductData.pp}`,
        method: "PATCH",
        body: {
          ...initialProductData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.pp },
      ],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/Product/delete/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetProdcutsQuery,
  useAddNewProductMutation,
  useGetOneProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLikedMutation,
  useByFamilyMutation,
  useGetfilterdMutation,
  useGetHeroMutation,
  useAddHeroMutation,
  useAcommentMutation,
  useDcommentMutation,
} = productsApiSlice;

// returns the query result object
export const selectProductsResult =
  productsApiSlice.endpoints.getProdcuts.select();

// creates memoized selector
const selectProductData = createSelector(
  selectProductsResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllProducts,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = ProductAdapter.getSelectors(
  (state) => selectProductData(state) ?? initialState
);
