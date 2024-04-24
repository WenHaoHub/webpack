import axios from "axios";
import { Message } from "element-ui";
// import {URL} from '../../config/url'
//https://release.cdgzjg.cn/main/ 成都国资委
// const token='eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOiJ1MDViZjA1ODdiMTNhNGU0MDg0M2IwZGUwZGFhZWQ4MmUiLCJ0ZW5hbnRJZCI6IjA5YzE1NmYyYjAxZTRiNjNiZDQyNDdmYjAxZTkzMzcyIiwic3Vic3lzdGVtSWQiOiIwOGY5NDU5NjE4M2E0Yzk2OWRiN2ZhNjQyZjBhMjUwNSIsImV4cCI6MTY2MTMxODYzNn0.7PF3rBp6dFVsv6Bbaepd3NgHzcBB11MhK0r0HO9pSI4'

// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // baseURL:window._GlobalConfig.baseUrl,
  baseURL:
    window.location.hostname == "localhost"
      ? `/api`
      : window._GlobalConfig.baseUrl,
  // 超时
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // config.headers['Authorization']=token //本地开发需要
    // config.headers['clientKey']='csjk'
    // config.headers['Authorization']=token
    // config.headers={
    //   clientKey:'csjk',
    //   Authorization:token
    // }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    return res.data;
    // 未设置状态码则默认成功状态
    // const code = res.data.code || 200;
    // // 获取错误信息
    // const msg = errorCode[code] || res.data.msg || errorCode['default']
    // if (code === 401) {
    //   MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   ).then(() => {
    //     store.dispatch('LogOut').then(() => {
    //       location.href = '/index';
    //     })
    //   }).catch(() => {});
    // } else if (code === 500) {
    //   Message({
    //     message: msg,
    //     type: 'error'
    //   })
    //   return Promise.reject(new Error(msg))
    // } else if (code !== 200) {
    //   Notification.error({
    //     title: msg
    //   })
    //   return Promise.reject('error')
    // } else {
    //   return res.data
    // }
  },
  (error) => {
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

// 通用下载方法
export function download(url, params, filename) {
  return service
    .post(url, params, {
      // `transformRequest` 允许在向服务器发送前，修改请求数据
      // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
      transformRequest: [
        (params) => {
          return tansParams(params);
        },
      ],
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      responseType: "blob",
    })
    .then((data) => {
      const content = data;
      const blob = new Blob([content]);
      if ("download" in document.createElement("a")) {
        const elink = document.createElement("a");
        elink.download = filename;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        navigator.msSaveBlob(blob, filename);
      }
    })
    .catch((r) => {
      console.error(r);
    });
}

export default service;
