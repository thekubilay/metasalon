let API: string = "";
let HOST: string = "";
let STATIC: string = "";
switch (import.meta.env.MODE) {
  case "development":
    API =  import.meta.env.VITE_APP_DATABASE_URL;
    HOST = import.meta.env.VITE_APP_HOST;
    STATIC = import.meta.env.VITE_APP_STATIC_PATH;
    break;
  case "production":
    API =  import.meta.env.VITE_APP_DATABASE_URL;
    HOST = import.meta.env.VITE_APP_HOST;
    STATIC = import.meta.env.VITE_APP_STATIC_PATH;
    break
  default:
    break;
}

export default {
  API,
  HOST,
  STATIC,
}
