const key = "zxjwttoken";

const user = "user";

export function getToken() {
  return sessionStorage.getItem(key);
}

export function setToken(data) {
  return sessionStorage.setItem(key, data);
}

export function removeToken() {
  return sessionStorage.removeItem(key);
}

export function setUser(data) {
  return sessionStorage.setItem(user, data);
}

export function removeUser() {
  return sessionStorage.removeItem(user);
}
