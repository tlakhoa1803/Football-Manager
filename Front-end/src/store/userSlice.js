import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userService from '../services/user';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: "",
    refreshToken: "",
    profile: {
      name: "",
      email: "",
    },
  },
  reducers: {
    setLoginSuccess: (state, action) => {
      const {accessToken, refreshToken} = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    setProfile: (state, action) => {
      state.profile.email = action.payload.email;
    },
    logout: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
    },
    setRefreshTokenSuccess: (state, action) => {
      const {accessToken, refreshToken} = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
})

export const {
  setLoginSuccess,
  setProfile,
  logout,
  setRefreshTokenSuccess,
} = userSlice.actions;

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, thunkAPI) => {
    const refreshToken = thunkAPI.getState().user.refreshToken;

    const result = await userService.refreshToken(refreshToken);

    thunkAPI.dispatch(setRefreshTokenSuccess(result));
  }
);

export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (_, thunkAPI) => {
    const data = await userService.getProfile();

    thunkAPI.dispatch(setProfile(data));
  },
);


export default userSlice.reducer;
