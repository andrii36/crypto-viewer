import actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    getTopTokensLoading: false,
    topTokens: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GET_TOP_TOKENS_DATA_SUCCESS: {
            return {
                ...state,
                topTokens: action.payload,
                getTopTokensLoading: false,
            }
        }
        case actionTypes.GET_TOP_TOKENS_LOADING: {
            return {
                ...state,
                getTopTokensLoading: true,
            }
        }
        default: {
            return state;
        }
    }
};