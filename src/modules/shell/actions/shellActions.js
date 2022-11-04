import actionTypes from "./actionTypes";
import api from '../../../api';

export const getDataByWalletAddress = (walletAddress) => async (dispatch) => {
    dispatch({type: actionTypes.GET_DATA_BY_WALLET_ADDRESS_LOADING});
    try{
        const response = await api.wallet.getDataByWalletAddress(walletAddress);
        dispatch({
            type: actionTypes.GET_DATA_BY_WALLET_ADDRESS_SUCCESS,
            payload: response.data
        })
    }catch(error){
        console.log(error)
    }
};