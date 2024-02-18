import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    repositories: [],
};

const repositorySlice = createSlice({
    name: 'repository',
    initialState,
    reducers: {
        setRepositories: (state, action) => {
            state.repositories = action.payload;
        },
    },
});

export const { setRepositories } = repositorySlice.actions;

export const repositorySelector = (state) => state.repository;

const repositoryReducer = repositorySlice.reducer;

export default repositoryReducer;
