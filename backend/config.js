// config.js

require("dotenv").config();

module.exports = {
    DB: 'mongodb://localhost:27017/sollers',
    APP_URL: process.env.APP_ENV === 'production' ? process.env.PROD_BASE_URL : process.env.DEV_BASE_URL
}
