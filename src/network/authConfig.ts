"use client";

import axios from "axios";

export const AuthService = () => {
  const URL = "http://localhost:8080/api";
  const login = (
    { emailOrUsername, password }: any,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    axios({
      method: "post",
      url: `${URL}/login`,
      data: {
        username: emailOrUsername,
        password: password,
        email: emailOrUsername,
      },
    })
      .then((response) => {
        callback(true, null, response.data);
      })
      .catch((error) => {
        callback(false, error);
      });
  };
  const signup = (
    { email, username, password }: any,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    axios({
      method: "post",
      url: `${URL}/signup`,
      data: {
        username: username,
        password: password,
        email: email,
      },
    })
      .then((response) => {
        callback(true, null, response.data);
      })
      .catch((error) => {
        callback(false, error);
      })
      .finally(() => console.log("singup....."));
  };
  return { login, signup };
};
