import { SERVICEDEFAULT as http } from "@/utils/http.js";
export const API = process.env.VUE_APP_PROXY_API;
/**
 *
 * 企业微信登录
 * @export
 * @param {string} code
 * @returns
 */
export function qywxlogin(code) {
  return http({
    url: `${API}api/zwwxlogin`,
    method: "get",
    params: {
      code
    }
  });
}
export function zxssologin(code) {
  return http({
    url: `${API}api/zxcodelogin`,
    method: "get",
    params: { code }
  });
}