// // redux/features/auth/authSlice.ts
// import { RootState } from "@/redux/store";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// type TAuthState = {
//   user: object | null;
//   token: string | null;
// };

// const initialState: TAuthState = {
//   user: null,
//   token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<TAuthState>) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;

// export const useCurrentToken = (state: RootState) => state.auth.token;
// export const useCurrentUser = (state: RootState) => state.auth.user;
