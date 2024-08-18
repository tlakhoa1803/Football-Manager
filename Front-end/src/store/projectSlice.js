import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    appList: [],
  },
  reducers: {
    setProject: (state, action) => {
      state.projectList = action.payload;
    },
  },
});

export const { setProject } = projectSlice.actions;

export const getProjects = createAsyncThunk(
  'project/getProject',
  async (_, thunkAPI) => {
    // const result = await AppService.listApps();
    const result = [
      {name: 'Project 1', id: 1},
      {name: 'Project 2', id: 2},
      {name: 'Project 3', id: 3},
    ];

    thunkAPI.dispatch(setProject(result));
  }
);

export default projectSlice.reducer;
