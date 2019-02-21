const APP_URL = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_PROD_BASE_URL : process.env.REACT_APP_DEV_BASE_URL

export default APP_URL;
