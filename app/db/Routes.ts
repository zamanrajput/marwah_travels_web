var debug = true;
export var APP_URL = "http://localhost:3000"; 


export var BACKEND_BASE_URL = "http://localhost:8000";
export var API_BASE_URL = BACKEND_BASE_URL + "/api";
if (debug) {
}


//panel
export const GET_CATEGORIES = API_BASE_URL+'/panel/categories';
export const POST_CREATE_CATEGORY = API_BASE_URL+'/categories/create';
export const UPDATE_CATEGORY = API_BASE_URL +'/panel/category/update';
export const GET_DELETE_PACKAGE = API_BASE_URL +'/packages/delete/';
export const GET_DELETE_BLOG = API_BASE_URL +'/blogs/delete/';

export const POST_CREATE_PACKAGE = API_BASE_URL +'/packages/create';
export const POST_UPDATE_PACKAGE = API_BASE_URL +'/packages/update';
export const GET_INQUIRIES = API_BASE_URL + '/inquiries';
export const GET_DELETE_INQUIRY = API_BASE_URL +'/inquiry/delete/';


export const GET_PACKAGES = API_BASE_URL + "/web/packs";
export const POST_SUBMIT_INQUIRY = API_BASE_URL + "/web/inquiry/submit";
export const GET_BLOGS = API_BASE_URL+'/web/blogs';


