import { getToken, removeToken, removeUser, setToken } from "@/utils/auth";
import axios from "axios";
import Qs from "qs";
import { Notify } from "vant";


const logout = function() {
  let url = window.location.href;
  let hash = window.location.hash;
  let href = url.replace(hash, "");
  removeToken();
  removeUser();
  // console.log(href, "href");
  window.location.href = href;
};

const SERVICE = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 60000,
  transformRequest: [
    function(data) {
      data = Qs.stringify(data);
      return data;
    }
  ],
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

// 设置请求头
SERVICE.interceptors.request.use(
  config => {
    let authToken = getToken();
    if (authToken != null) {
      config.headers.zxjwttoken = authToken;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

SERVICE.interceptors.response.use(
  response => {
    if (response.headers.refreshtoken) {
      setToken(response.headers.refreshtoken);
    }
    if (response.data.code === "401" && !response.data.success) {
      Notify({
        message: response.data.message,
        duration: 2 * 1000
      });
     logout();
    }
    return response;
  },
  error => {
    // Notify({
    //   message: error.message,
    //   duration: 2 * 1000
    // })
    return Promise.reject(error);
  }
);

SERVICE.all = axios.all; // all方法没有挂载到 axios 实例对象中

const SERVICEDEFAULT = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 60000
});

// 设置请求头
SERVICEDEFAULT.interceptors.request.use(
  config => {
    let authToken = getToken();
    if (authToken != null) {
      config.headers.zxjwttoken = authToken;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

SERVICEDEFAULT.interceptors.response.use(
  response => {
    if (response.headers.refreshtoken) {
      setToken(response.headers.refreshtoken);
    }
    if (response.data.code === "401" && !response.data.success) {
      Notify({
        message: response.data.message,
        duration: 2 * 1000
      });
      logout();
    }
    return response.data;
  },
  error => {
    // Notify({
    //   message: error.message,
    //   duration: 2 * 1000
    // })
    console.log(error);
    if (error && error.response) {
      if (error.response.status == "401") {
        const message = "未授权，请重新登录";
        Notify({
          message,
          duration: 2 * 1000
        });
        logout();
      }
    }

    return Promise.reject(error);
  }
);

SERVICEDEFAULT.all = axios.all; // all方法没有挂载到 axios 实例对象中

const UploadFile = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000
});
UploadFile.interceptors.response.use(response => {
  return response.data;
});

export { SERVICE, SERVICEDEFAULT, UploadFile };

