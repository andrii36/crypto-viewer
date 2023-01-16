import api from '../../../api';
import { getTopTokensDataSuccess, getTopTokensLoading } from "../reducers/marketData";

export const getTopTokensData = () => async (dispatch) => {
    dispatch(getTopTokensLoading());
    try{
        const {data} = await api.market.getTopTokens();
        dispatch(getTopTokensDataSuccess(data.tokens))
    }catch(error){
        console.log(error)
    }
};