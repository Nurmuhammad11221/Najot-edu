import { BASE_URL } from "./client";

// Umumiy ruxsatsiz sorovlar
async function authRequest(endpoint, payload, reqMethod = "POST") {
  const response = await fetch(BASE_URL + endpoint, {
    method: reqMethod,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let parsedData = null;
  try {
    parsedData = await response.json();
  } catch (e) {
    parsedData = null;
  }

  if (response.ok) {
    return parsedData;
  } else {
    throw new Error(parsedData?.message ? parsedData.message : `Xatolik: ${response.status}`);
  }
}

export const authApi = {
  login: function (params) {
    return authRequest("/auth/login", { phone: params.phone, password: params.password });
  },
  sendOtp: function (params) {
    return authRequest("/auth/send-otp", { phone: params.phone });
  },
  verifyOtp: function (params) {
    return authRequest("/auth/verify-otp", { phone: params.phone, otp: String(params.otp).trim() });
  },
  refreshToken: function (params) {
    return authRequest("/auth/refresh-token", { token: params.token });
  },
  changePassword: function (params) {
    return authRequest("/auth/change-password", { phone: params.phone, password: params.password }, "PUT");
  },
};
