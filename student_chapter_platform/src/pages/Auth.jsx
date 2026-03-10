import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, registerApi, sendOtpApi, verifyOtpApi, resetPasswordApi } from '../services/allApi';

function Auth({ register }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "forgot"
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    college: ""
  });
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // College dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select College");
  const [customCollege, setCustomCollege] = useState("");
  const colleges = [
    "Christ College (Autonomous), Irinjalakuda",
    "Sahrdaya College of Engineering & Technology",
    "Rajagiri School of Engineering & Technology (in Kochi, Kerala)",
    "Rajagiri College of Social Sciences",
    "Amrita Vishwa Vidyapeetham",
    "Government Engineering College, Thrissur",
    "Government Engineering College, Thiruvananthapuram",
    "Other",
  ];

  const handleSelect = (college) => {
    setSelected(college);
    setIsOpen(false);
    if (college !== "Other") {
      setUserDetails({ ...userDetails, college });
      setCustomCollege("");
    } else {
      setUserDetails({ ...userDetails, college: "" });
    }
  };

  // Register
  const handleRegister = async () => {
    const { username, email, password, college } = userDetails;
    if (!username || !email || !password || (!college && !customCollege)) {
      toast.info("Please fill the form completely");
      return;
    }
    const finalDetails = { ...userDetails, college: college || customCollege };
    try {
      const response = await registerApi(finalDetails);
      if (response?.status === 201 || response?.status === 200) {
        toast.success("Registration Successful 🎉");
        navigate("/");
      } else if (response?.status === 409 || response?.status === 406) {
        toast.error("Account Already Exists");
      } else toast.error("Something went wrong");
    } catch {
      toast.error("Registration failed");
    }
  };

  // Login
const handleLogin = async () => {
  const { email, password } = userDetails;
  if (!email || !password) {
    toast.info("Please fill the form completely");
    return;
  }

  try {
    const result = await loginApi({ email, password });
    // Normalize: axios returns response.data, fetch wrappers might return data directly
    const data = result?.data || result;

    console.log("LOGIN full result:", result);
    console.log("LOGIN normalized data:", data);

    // Expectation from your controller: data.existingUser, data.token, data.role
    const existingUser = data?.existingUser;
    const token = data?.token || data?.accessToken;
    const role = data?.role || existingUser?.role;

    if (!token || !existingUser) {
      console.warn("Login succeeded but missing token or existingUser:", { token, existingUser, data });
      toast.error("Login response missing required data (token/user). Check console.");
      return;
    }

    // Save values (synchronous)
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("existingUser", JSON.stringify(existingUser));
    // convenience entries
    if (existingUser.username) sessionStorage.setItem("username", existingUser.username);
    if (existingUser.email) sessionStorage.setItem("email", existingUser.email);

    // Verify immediately in console
    console.log("STORED existingUser:", sessionStorage.getItem("existingUser"));

    toast.success("Login successful 🎉");
    navigate(role === "admin" ? "/admin-dashboard" : "/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Something went wrong");
  }
};


  // Forgot Password - Send OTP
  const handleSendOtp = async () => {
    if (!userDetails.email) {
      toast.info("Enter your registered email");
      return;
    }
    try {
      const res = await sendOtpApi({ email: userDetails.email });
      if (res?.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent to your email");
      } else {
        toast.error(res?.data?.message || "Email not registered");
      }
    } catch {
      toast.error("Error sending OTP");
    }
  };

  // Verify OTP & Reset Password using two separate APIs
  const handleVerifyAndReset = async () => {
    if (!otp || !newPassword) {
      toast.info("Please fill all fields");
      return;
    }

    try {
      // 1️⃣ Verify OTP
      const verifyRes = await verifyOtpApi({ email: userDetails.email, otp });
      if (verifyRes?.status === 200) {
        // 2️⃣ Reset Password
        const resetRes = await resetPasswordApi({ email: userDetails.email, new_password: newPassword });
        if (resetRes?.status === 200) {
          toast.success("Password Reset Successfully 🎉");
          setMode("login");
          setOtp("");
          setNewPassword("");
          setOtpSent(false);
        } else {
          toast.error(resetRes?.data?.message || "Failed to reset password");
        }
      } else {
        toast.error(verifyRes?.data?.message || "Invalid or expired OTP");
      }
    } catch {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen relative bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="w-full md:w-5/6 relative z-10">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-2xl w-full md:w-3/4 lg:w-2/5 mx-auto">
          <div className="flex flex-col items-center text-white text-center p-6">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              Student Chapter Platform
            </h1>

            {mode === "forgot" ? (
              <h5 className="mt-2 text-lg opacity-90">Reset Your Password</h5>
            ) : register ? (
              <h5 className="mt-2 text-lg opacity-90">Sign up to your Account</h5>
            ) : (
              <h5 className="mt-2 text-lg opacity-90">Sign in to your Account</h5>
            )}

            <form className="mt-6 w-5/6 space-y-4">

              {/* ================= REGISTER FORM ================= */}
              {register && (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 rounded-md bg-white text-gray-900"
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  />

                  {/* College Dropdown */}
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
                      className="w-full flex justify-between items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none"
                    >
                      {selected}
                      <svg className="ml-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <ul className="py-1">
                          {colleges.map((college, idx) => (
                            <li
                              key={idx}
                              onClick={() => handleSelect(college)}
                              className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {college}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selected === "Other" && (
                      <input
                        type="text"
                        placeholder="Enter your college name"
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={customCollege}
                        onChange={(e) => {
                          setCustomCollege(e.target.value);
                          setUserDetails({ ...userDetails, college: e.target.value });
                        }}
                      />
                    )}
                  </div>

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded-md bg-white text-gray-900"
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-md bg-white text-gray-900"
                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  />

                  <button type="button" onClick={handleRegister} className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold py-2 rounded-md">
                    Register
                  </button>

                  <p className="mt-3 text-sm">
                    Already a User? <Link to="/" className="text-cyan-200 hover:underline">Login</Link>
                  </p>
                </>
              )}

              {/* ================= LOGIN FORM ================= */}
              {mode === "login" && !register && (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded-md bg-white text-gray-900"
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-md bg-white text-gray-900"
                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  />

                  <button type="button" onClick={handleLogin} className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold py-2 rounded-md">
                    Login
                  </button>

                  <div className="flex justify-center gap-4 text-sm mt-3">
                    <button type="button" onClick={() => setMode("forgot")} className="text-cyan-400 hover:underline">
                      Forgot Password?
                    </button>
                    <span>|</span>
                    <Link to="/register" className="text-cyan-400 hover:underline">
                      Register
                    </Link>
                  </div>
                </>
              )}

              {/* ================= FORGOT PASSWORD ================= */}
              {mode === "forgot" && (
                <>
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    className="w-full px-4 py-2 rounded-md bg-white text-gray-900"
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  />

                  {!otpSent ? (
                    <button type="button" onClick={handleSendOtp} className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold py-2 rounded-md">
                      Send OTP
                    </button>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full px-4 py-2 rounded-md bg-white text-gray-900"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 rounded-md bg-white text-gray-900"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button type="button" onClick={handleVerifyAndReset} className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold py-2 rounded-md">
                        Reset Password
                      </button>
                    </>
                  )}

                  <button type="button" onClick={() => { setMode("login"); setOtpSent(false); }} className="text-cyan-300 mt-3 hover:underline text-sm">
                    Back to Login
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
}

export default Auth;
