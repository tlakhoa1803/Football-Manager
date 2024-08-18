import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { FLASH_TYPES as TYPES, FLASH_TIMEOUT } from '../../../src/const';

let activeTimeout;

export const flashMessageSlice = createSlice({
  name: 'flashMessage',
  initialState: {
    title: '',
    message: '',
    isActive: false,
    type: TYPES.INFO,
  },
  reducers: {
    show: (state, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.isActive = true;
      state.type = action.payload.type;
    },
    hide: (state) => {
      state.title = '';
      state.message = '';
      state.isActive = false;
    },
  },
});

export const { show, hide } = flashMessageSlice.actions;

/**
 * Thunk action creator to show an info flash message.
 * @type {import("@reduxjs/toolkit").AsyncThunk<void, { message: string }, {}>}
 */
export const showInfo = createAsyncThunk(
  'flashMessage/info',
  ({ message }, thunkAPI) => {
    const payload = {
      message,
      isActive: true,
      type: TYPES.INFO,
    };

    thunkAPI.dispatch(show(payload));

    if (activeTimeout) clearTimeout(activeTimeout);

    activeTimeout = setTimeout(() => {
      thunkAPI.dispatch(hide());
    }, FLASH_TIMEOUT);
  }
);

/**
 * Thunk action creator to show an error flash message.
 * @type {import("@reduxjs/toolkit").AsyncThunk<void, { message: string }, {}>}
 */
export const showError = createAsyncThunk(
  'flashMessage/error',
  ({ message }, thunkAPI) => {
    const payload = {
      message,
      isActive: true,
      type: TYPES.ERROR,
    };

    thunkAPI.dispatch(show(payload));

    if (activeTimeout) clearTimeout(activeTimeout);

    activeTimeout = setTimeout(() => {
      thunkAPI.dispatch(hide());
    }, FLASH_TIMEOUT);
  }
);

export default flashMessageSlice.reducer;


