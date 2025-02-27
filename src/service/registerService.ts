import axios, { AxiosError } from "axios";


import AxiosApi from "./axiosApi";
import { LoginRequest, LoginResponse, User } from "../types/user.ts";

interface RegisterResponse {
  message: string;
  user: User;
}

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || "Error en la petición");
  } else {
    throw new Error("Error desconocido");
  }
};

export const registerUser = async (
  userData: User
): Promise<RegisterResponse> => {
  return AxiosApi.post<RegisterResponse>("/user/register", userData)
  .then(response => response.data)
  .catch(handleAxiosError);
};

export const loginUserJwt = async (userData: LoginRequest): Promise<LoginResponse> => {
  return AxiosApi.post<LoginResponse>("/user/login-jwt", userData)
    .then(response => response.data)
    .catch(handleAxiosError);
};

export const logoutUserJwt = async (): Promise<string> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No se encontró el token de autenticación");

  return AxiosApi.post<string>("/user/logout-jwt", {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      localStorage.removeItem("authToken");
      return response.data;
    })
    .catch(handleAxiosError);
};
