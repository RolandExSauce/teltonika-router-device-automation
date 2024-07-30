// Import and export environment variables
const DELETE_CODE = import.meta.env.VITE_ROUTER_DELETE_CODE; //code to delete a device, TODO: move this in Database

const isProd = import.meta.env.VITE_ENVIRONMENT === "production";

//graphql api endpoint
const API_ENPOINT = isProd
  ? import.meta.env.VITE_API_ENDPOINT_PROD
  : import.meta.env.VITE_API_ENDPOINT_DEV;


//rest upload endpoint
const REST_ENPOINT_UPLOAD = isProd
? import.meta.env.VITE_REST_ENDPOINT_UPLOAD_PROD
: import.meta.env.VITE_REST_ENDPOINT_UPLOAD_DEV;

export {
  DELETE_CODE,
  API_ENPOINT,
  REST_ENPOINT_UPLOAD
}