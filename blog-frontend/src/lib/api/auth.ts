import axios from 'axios';

type loginPayload = { username: string; password: string };
export const login = (payload: loginPayload) => axios.post(`/api/auth/login`, payload);
export const check = () => axios.post(`/api/auth/check`, {});
export const logout = () => axios.post(`/api/auth/logout`, {});
