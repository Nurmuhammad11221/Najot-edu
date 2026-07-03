import { getToken, removeToken } from "../hooks/useAuth";

// API manzilini belgilash
const devUrl = import.meta.env.VITE_API_URL;
const prodUrl = "https://najot-edu.softwareengineer.uz/api/v1";
export const BASE_URL = devUrl ? devUrl : prodUrl;

export async function request(path, options = {}) {
  const userToken = getToken();
  let requestHeaders = { ...options.headers };

  if (userToken) {
    requestHeaders["Authorization"] = `Bearer ${userToken}`;
  }

  const isFormData = options.body instanceof FormData;
  if (!isFormData) {
    requestHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(BASE_URL + path, {
    ...options,
    headers: requestHeaders,
  });

  if (response.status === 401) {
    removeToken();
    window.location.replace("/login");
    return;
  }

  let resultData = null;
  try {
    resultData = await response.json();
  } catch (error) {
    resultData = null;
  }

  if (!response.ok) {
    const errorMsg = resultData?.message || `Xatolik yuz berdi: ${response.status}`;
    throw new Error(errorMsg);
  }

  return resultData;
}
