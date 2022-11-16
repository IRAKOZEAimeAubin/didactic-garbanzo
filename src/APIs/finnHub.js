import axios from 'axios';

const API_KEY = 'cdq9s3qad3i5u3riklcgcdq9s3qad3i5u3rikld0'

export default axios.create( {
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: API_KEY
    }
})