const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');


const HOST = "localhost";
const API_SERVICE_URL = "https://json.freeastrologyapi.com";
const dotenv = require('dotenv');

dotenv.config();

const app = express();


// enable cors
app.use(cors({
    origin: '*'
}));

app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '',
    },
    headers: {"x-api-key": process.env.API_KEY}
 }));



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`${new Date()} --  Backend server is running on port no ${PORT}`)
});