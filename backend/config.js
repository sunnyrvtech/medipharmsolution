// config.js

require("dotenv").config();

module.exports = {
    DB: 'mongodb://localhost:27017/sollers',
    APP_URL: process.env.APP_ENV === 'production' ? process.env.PROD_APP_URL : process.env.DEV_APP_URL,
    IMAGE_CATEGORY_URL: process.env.APP_ENV === 'production' ? process.env.PROD_BACK_BASE_URL+"/category/" : process.env.DEV_BACK_BASE_URL+"/category/",
    IMAGE_COURSE_URL: process.env.APP_ENV === 'production' ? process.env.PROD_BACK_BASE_URL+"/course/" : process.env.DEV_BACK_BASE_URL+"/course/",
    USER_IMAGE_URL: process.env.APP_ENV === 'production' ? process.env.PROD_BACK_BASE_URL+"/user/" : process.env.DEV_BACK_BASE_URL+"/user/",
    BLOG_IMAGE_URL: process.env.APP_ENV === 'production' ? process.env.PROD_BACK_BASE_URL+"/blog/" : process.env.DEV_BACK_BASE_URL+"/blog/",
}
