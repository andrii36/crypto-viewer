import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    getTopTokensLoading: false,
    topTokens: [],
};

const marketData = createSlice({
    name: 'marketData',
    initialState: INITIAL_STATE,
    reducers: {
        getTopTokensDataSuccess(state, action) {
            state.topTokens = action.payload;
            state.getTopTokensLoading = false;
        },
        getTopTokensLoading(state) {
            state.getTopTokensLoading = true
        }
    }
})

export const {getTopTokensDataSuccess, getTopTokensLoading} = marketData.actions;
export default marketData.reducer;