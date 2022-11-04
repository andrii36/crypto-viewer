import actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    walletSearchLoading: false,
    mainWalletData: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_BY_WALLET_ADDRESS_SUCCESS: {
            return {
                ...state,
                mainWalletData: action.payload,
                walletSearchLoading: false,
            }
        }
        case actionTypes.GET_DATA_BY_WALLET_ADDRESS_LOADING: {
            return {
                ...state,
                walletSearchLoading: true,
            }
        }
        default: {
            return state;
        }
    }
};