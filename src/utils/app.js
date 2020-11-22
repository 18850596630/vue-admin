import cookie from "cookie_js";

const admin_Token = "admin_token";

export function getToken() {
    return cookie.get(admin_Token);
}

export function setToken(token) {
    return cookie.set(admin_Token, token);
}

export function removeToken() {
    return cookie.remove(admin_Token);
}


export function setUserName(value) {
    return cookie.set('username', value);
}

export function getUserName() {
    return cookie.get('username');
}

export function removeUserName() {
    return cookie.remove('username');
}