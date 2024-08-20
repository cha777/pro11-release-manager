import axios from 'axios';
import { fetchWrapper } from '@/utils/fetch-wrapper';

interface AuthResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

const login = async (email: string, password: string) => {
  const response = await axios.post('/api/auth/login', { email, password });

  return response.data as AuthResponse;

  // const response = await fetchWrapper<AuthResponse>('/api/auth/login', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     email,
  //     password,
  //   }),
  // });

  // return response;
};

const me = async () => {
  const response = await axios.post('/api/auth/me');

  // return response.data as AuthResponse;
  // const response = await fetchWrapper<AuthResponse>('/api/auth/me', {
  //   method: 'POST',
  // });

  return response.data as AuthResponse;
};

const logout = async () => {
  await axios.post('/api/auth/logout');
  // await fetchWrapper('/api/auth/logout', {
  //   method: 'POST',
  // });
};

export default {
  login,
  me,
  logout,
};
