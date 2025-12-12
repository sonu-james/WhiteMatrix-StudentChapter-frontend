import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// =========================
// 🔹 Register API
// =========================
export const registerApi = async (reqBody) => {
  try {
    const response = await commonApi("POST", `${serverUrl}/register`, reqBody, "");
    return response;
  } catch (error) {
    return error.response;
  }
};

// =========================
// 🔹 Login API
// =========================
export const loginApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/login`, reqBody, "");
};

// =========================
// 🔹 Forgot Password APIs
// =========================

// 1️⃣ Send OTP
export const sendOtpApi = async (data) => {
  return await commonApi("POST", `${serverUrl}/send-otp`, data, "");
};

// 2️⃣ Verify OTP
export const verifyOtpApi = async (data) => {
  return await commonApi("POST", `${serverUrl}/verify-otp`, data, "");
};

// 3️⃣ Reset Password
export const resetPasswordApi = async (data) => {
  return await commonApi("POST", `${serverUrl}/reset-password`, data, "");
};

// =========================
// 🔹 Profile Update Api
// =========================
export const profileUpdateApi =async(data,reqHeader)=>{
  return await commonApi("PUT",`${serverUrl}/update-profile`,data,reqHeader);
}

// 🔹 Profile info Api
// =========================
export const profileInfoApi =async(reqHeader)=>{
  return await commonApi("GET",`${serverUrl}/profile-Info`,"",reqHeader);
}

