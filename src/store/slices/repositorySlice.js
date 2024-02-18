import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    repositories: [],
};

const repositorySlice = createSlice({
    name: 'repository',
    initialState,
    reducers: {
        store: (state,action) => {
         console.log('action', action);
        },
        decrement: state => state - 1,
    },
});

export const { increment, decrement } = repositorySlice.actions;

export const repositorySelector = (state) => state.repositories;

const repositoryReducer = repositorySlice.reducer;

export default repositoryReducer;
