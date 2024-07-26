// Import and export environment variables
const DELETE_CODE = import.meta.env.VITE_ROUTER_DELETE_CODE; //code to delete a device, move this in Database

const isProd = import.meta.env.VITE_ENVIRONMENT === "production";
const API_ENPOINT = isProd
  ? import.meta.env.VITE_API_ENDPOINT_PROD
  : import.meta.env.VITE_API_ENDPOINT_DEV;

export {
  DELETE_CODE,
  API_ENPOINT

}