// config.js

require("dotenv").config();

module.exports = {
    DB: 'mongodb://localhost:27017/sollers',
    APP_FRONT_URL: process.env.APP_ENV === 'production' ? process.env.PROD_FRONT_BASE_URL : process.env.DEV_FRONT_BASE_URL,
    APP_BACK_URL: process.env.APP_ENV === 'production' ? process.env.PROD_BACK_BASE_URL : process.env.DEV_BACK_BASE_URL,
    IMAGE_CATEGORY_URL: process.env.APP_ENV === 'production' ? process.env.PROD_BACK_BASE_URL+"/category/" : process.env.DEV_BACK_BASE_URL+"/category/",
    IMAGE_COURSE_URL: process.env.APP_ENV === 'production' ? process.env.PROD_BACK_BASE_URL+"/course/" : process.env.DEV_BACK_BASE_URL+"/course/",
}
