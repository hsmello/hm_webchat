let APIBaseUrl = "http://localhost:5000";

if (process.env.NODE_ENV === 'production') {
    APIBaseUrl = 'https://hm-webchat-api.herokuapp.com/'
} 

export default APIBaseUrl;