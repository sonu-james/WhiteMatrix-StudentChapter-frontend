import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, registerApi } from '../services/allApi';


function Auth({ register }) {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);


//Register
  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info("plz fill the form completely")
    }
    else {
      const result = await registerApi(userDetails)
      console.log(result);
      if (result.status == 200) {
          toast.success("Registration Successfully Completed 🎉", {
          style: {
            backgroundColor: "rgb(43, 179, 179)", // teal background
            color: "#fff",                        // white text
            fontWeight: "600",
          },
        });
        navigate('/')

      }
      else {
        toast.error('Something went wrong plz try after some time')
      }
    }

  }

  //Login
  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info('plz fill the form completely')
    }
    else {
      const result = await loginApi({ email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success("Login successfully 🎉", {
          style: {
            backgroundColor: "rgb(43, 179, 179)", // teal background
            color: "#fff",                        // white text
            fontWeight: "600",
          },
        });
        sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser))
        sessionStorage.setItem('token', result.data.token)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        setTimeout(() => {
          navigate('/dashboard')
        }, 3000)

      }
      else {
        toast.error(result.response.data)
      }
    }

  }

  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen relative bg-gray-900">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Main Content */}
        <div className="w-11/12 md:w-3/4 relative z-10">
          {/* Card */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 mt-3 rounded-2xl shadow-2xl w-full md:w-3/4 lg:w-2/5
 mx-auto">
            {/* Right - Form Only */}
            <div className="flex flex-col items-center justify-center text-white text-center p-6">
              <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                Student Chapter Platform
              </h1>

              {register ? (
                <h5 className="text-lg mt-2 opacity-90">Sign up to your Account</h5>
              ) : (
                <h5 className="text-lg mt-2 opacity-90">Sign in to your Account</h5>
              )}

              <form className="mt-6 w-3/4 space-y-4">
                {/* Username - Only for Register */}
                {register && (
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 rounded-md bg-white/80 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, username: e.target.value })
                    }
                  />
                )}

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md bg-white/80 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                />

                {/* Password */}
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-md bg-white/80 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                />

                {/* Buttons */}
                {register ? (
                  <div>
                    <button
                      type="button"
                      className="w-full bg-gradient-to-r from-white via-cyan-100 to-cyan-600 hover:from-white hover:via-cyan-200 hover:to-cyan-700 text-gray-900 font-semibold py-2 rounded-md shadow-lg transition"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                    <p className="mt-3 text-sm">
                      Already a User?{" "}
                      <Link
                        to="/"
                        className="text-cyan-200 font-semibold hover:underline"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      className="w-full bg-gradient-to-r from-white via-cyan-100 to-cyan-600 hover:from-white hover:via-cyan-200 hover:to-cyan-700 text-gray-900 font-semibold py-2 rounded-md shadow-lg transition"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <p className="mt-3 text-sm">
                      New User?{" "}
                      <Link
                        to="/register"
                        className="text-cyan-200 font-semibold hover:underline"
                      >
                        Register
                      </Link>
                    </p>
                  </div>

                )}
              </form>
            </div>
          </div>
        </div>

        {/* Toast */}
        <ToastContainer position="top-center" theme="colored" />
      </div>

    </>
  )
}

export default Auth