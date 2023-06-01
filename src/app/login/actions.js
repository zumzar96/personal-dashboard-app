import React from "react";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export function loginRequest(userBody) {
  return {
    type: LOGIN_REQUEST,
    userBody,
  };
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export function loginSuccess(token, error) {
  return {
    type: LOGIN_SUCCESS,
    token,
    error:error
    
  };
}

export const LOGIN_ERROR = "LOGIN_ERROR";
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
    
  };
}
