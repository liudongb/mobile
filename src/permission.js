// import { getToken } from "./utils/auth";
import { qywxlogin, zxssologin } from "@/api/index";
import Qs from 'qs';
import router from "./router";
router.beforeEach(async (to, from, next) => {

  // set page title
  const meta = to.meta;
  if (meta.title) {
    document.title = "酒店隔离";
  }

  let code = getQueryString('code');
  // console.log(code, sessionStorage.getItem('user')==null&&code!=null);

  if (sessionStorage.getItem('user') == null && code != null) {
    let codetype = getQueryString('codetype');
    if (codetype === 'zx') {
      zxssologin(code).then(res => {
        if (res.isSuccess) {
          sessionStorage.setItem('user', JSON.stringify(res.user));
          sessionStorage.setItem('zxjwttoken', res.token);
          let routerpath = getQueryString('routerpath');
          let dat = window.location.href.split('?')[0];
          history.pushState({}, "", dat);
          if (routerpath != null) {
            next(routerpath);
          }
          else {
            next();
          }
        } else {
          alert('卓讯认证授权登陆失败，code：002');
        }
      })
        .catch(() => {
          alert('请求服务异常，code：001');
        })
        .finally(() => {

        });
    } else {
      try {
        const res = await qywxlogin(code);
        if (res.isSuccess) {
          sessionStorage.setItem('user', JSON.stringify(res.user));
          sessionStorage.setItem('zxjwttoken', res.token);
          let routerpath = getQueryString('routerpath');
          let dat = window.location.href.split('?')[0];
          history.pushState({}, "", dat);
          if (routerpath != null) {
            next(routerpath);
          }
          else {
            next();
          }
        } else {
          alert('政务授权登陆失败，code：002');
        }
      } catch (error) {
        alert('请求服务异常，code：001');
      }
    }

  } else {
    next();
  }
});

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const href = window.location.href;
  const str = href.substr(href.indexOf('?') + 1);
  var r = str.match(reg);
  // console.log(name,window.location, str,r!=null,Qs.parse(window.location.search));
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}



