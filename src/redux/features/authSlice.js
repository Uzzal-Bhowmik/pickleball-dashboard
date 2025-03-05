import { removeFromSessionStorage } from "@/utils/sessionStorage";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;

      // Set token to cookie for middleware accessibility
      Cookies.set("pickleball-access-token", token, {
        path: "/",
        sameSite: true,
      });
    },

    logout: (state) => {
      // Remove token for cookies
      Cookies.remove("pickleball-access-token", {
        path: "/",
        sameSite: true,
      });
      removeFromSessionStorage("pickleball-access-token");

      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
