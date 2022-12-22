import actionTypes from "./actionTypes";
import api from '../../../api';

export const getTopTokensData = () => async (dispatch) => {
    dispatch({type: actionTypes.GET_TOP_TOKENS_LOADING});
    try{
        const response = await api.market.getTopTokens();
        dispatch({
            type: actionTypes.GET_TOP_TOKENS_DATA_SUCCESS,
            payload: response.data.tokens
        });
    }catch(error){
        console.log(error)
    }
};