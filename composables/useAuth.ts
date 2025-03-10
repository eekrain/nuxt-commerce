import { useState, useFetch, useCookie } from "#app";

const API_URL = "https://api.escuelajs.co/api/v1/auth";

type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export const useAuth = () => {
  const accessToken = useCookie("access_token");
  const refreshToken = useCookie("refresh_token");
  const user = useState<User | null>("user", () => null);

  const login = async (email: string, password: string) => {
    const { data, error } = await useFetch<LoginResponse>(`${API_URL}/login`, {
      method: "POST",
      body: { email, password },
    });

    data.value?.access_token;

    if (error.value) throw error.value;

    accessToken.value = data.value?.access_token!;
    refreshToken.value = data.value?.refresh_token!;

    // Fetch user info after login
    await fetchUser();
  };

  const fetchUser = async () => {
    if (!accessToken.value) return;
    const { data, error } = await useFetch<User>(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${accessToken.value}` },
    });

    if (!error.value) user.value = data.value;
  };

  // Logout function
  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
  };

  return { accessToken, user, login, fetchUser, logout };
};
