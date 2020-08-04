import jwtdecode from 'jwt-decode';
import http from './httpService';
import config from '../config/defualt.json';

export function register(user) {
  const formData = new FormData();
  for(let item in user)
    formData.append(item, user[item]);

    return  http.post(config.url + "user", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}

export function update(user) {
  const formData = new FormData();
  for(let item in user)
    formData.append(item, user[item]);

    return  http.put(config.url + "user/me", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}


export function login(user) {
  return http.post(config.url + "login", user); // response token
}

export function logout() {
  localStorage.removeItem("token");
  window.location.pathname = '/login';
}

export function getUser(){
  const jwt = localStorage.getItem("token"); //getting current user from jwt-token which is in storage.
  try {
    const user = jwtdecode(jwt); //decode jwt-token
    return user;
  } catch(ex){}
}

export function getUserDetail() {
  return http.get(config.url + "user/me");
}

export function getToken() {
  return localStorage.getItem("token");
}