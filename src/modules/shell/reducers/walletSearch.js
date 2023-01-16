import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    walletSearchLoading: false,
    mainWalletData: {},
};

const walletSearchSlice = createSlice({
    name: 'walletSearch',
    initialState: INITIAL_STATE,
    reducers: {
        getDataByWalletAddressSuccess(state, action) {
            state.mainWalletData = action.payload;
            state.walletSearchLoading = false;
        },
        getDataByWalletAddressLoading(state) {
            state.walletSearchLoading = true;
        },
        clearWalletAddress(state) {
            state.mainWalletData = {}
        },
    }
});

export const {getDataByWalletAddressLoading, getDataByWalletAddressSuccess, clearWalletAddress} = walletSearchSlice.actions;
export default walletSearchSlice.reducer;