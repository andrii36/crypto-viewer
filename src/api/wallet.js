import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.ethplorer.io',
});
//https://api.etherscan.io/api
//https://api-ropsten.etherscan.io/api

export default {
    getDataByWalletAddress: (walletAddress) => {
        return instance.get(`/getAddressInfo/${walletAddress}`, { params: { apiKey: 'freekey' } });
    }
}