import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.ethplorer.io',
});

export default {
    getDataByWalletAddress: (walletAddress) => {
        return instance.get(`/getAddressInfo/${walletAddress}`, { params: { apiKey: 'freekey' } });
    }
}