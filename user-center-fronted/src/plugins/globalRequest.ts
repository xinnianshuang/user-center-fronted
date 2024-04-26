/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from 'antd';
import {history} from "@@/core/history";

const loginPath = '/user/login/';
const RegisterPath = '/user/register/';

const NO_NEED_LOGIN_WHITE_LIST = [loginPath, RegisterPath];

/**
 * 配置request请求时的默认参数
 */
const request = extend({

  credentials: 'include', // 默认请求是否带上cookie
  // prefix: process.env.NODE_ENV === 'production' ? 'https://user-front.code.cn' : undefined
  prefix: process.env.NODE_ENV === 'production' ? 'http://47.109.196.49' : undefined

  // requestType: 'form',
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Request is being made to URL: ${url}`);
  }
  console.log(`Request is being made to URL: ${url}`);
  return {
    url,
    options: {
      ...options,
      headers: {},
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response): Promise<any> => {
  const res = await response.clone().json();
  if (process.env.NODE_ENV === 'development') {
    console.log("res:::" + res);
    console.log("JSON.stringify(res):::" + JSON.stringify(res));
    console.log("res.code:::" + res.code);
    console.log("response:::" + response);
    console.log("res.data:::" + res.data);
  }

  if (res.code === 0) {
    return res.data;
  }
  else if (res.code === 40100) {
    if (!NO_NEED_LOGIN_WHITE_LIST.includes(history.location.pathname)) {
      message.error('未登录');
      // history.replace({
      //   pathname: '/user/login',
      //   search: stringify({
      //     redirect: location.pathname,
      //   }),
      // });
      history.push('/user/login');
    }
  }
  else {
    message.error(res.description);
  }
  return res.data;
});

export default request;
