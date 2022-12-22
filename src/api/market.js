import axios from 'axios';

const apiKey = 'freekey';

const instance = axios.create({
    baseURL: 'https://api.ethplorer.io',
});

export default {
    getTopTokens: () => {
        return instance.get('/getTop', { params: { apiKey} });
    }
};