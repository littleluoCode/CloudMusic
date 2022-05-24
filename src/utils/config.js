const devBaseURL = "api";
const proBaseURL = "http://1.117.169.27:3300";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

export const TIMEOUT = 5000;