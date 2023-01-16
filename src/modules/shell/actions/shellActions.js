import api from '../../../api';
import { getDataByWalletAddressLoading, getDataByWalletAddressSuccess } from "../reducers/walletSearch";

export const getDataByWalletAddress = (walletAddress) => async (dispatch) => {
    dispatch(getDataByWalletAddressLoading());
    try{
        const response = await api.wallet.getDataByWalletAddress(walletAddress);
        dispatch(getDataByWalletAddressSuccess(response.data))
    }catch(error){
        console.log(error)
    }
};
