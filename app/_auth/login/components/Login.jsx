"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
const LottieClient = dynamic(() => import("@/app/components/LottieClient"), {
  ssr: false,
});
var images = [
  "/anime1.jpg",
  "/anime2.jpg",
  "/anime3.jpg",
  "/anime4.jpg",
  "/anime5.jpg",
  "/anime6.jpg",
];

const Login = () => {
  const [image, setImage] = useState(images[0]);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEyeClick = () => {
    setHiddenPassword(!hiddenPassword);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => {
        let next;
        do {
          next = images[Math.floor(Math.random() * images.length)];
        } while (next === prev);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen  relative">
      <h2 className="text-3xl md:text-5xl text-gray-300 m-2 ">Login</h2>
      <div className="flex flex-row bg-white w-[90%] lg:w-[70%] h-auto lg:h-[70%] rounded-lg">
        <div className="flex-[1] lg:flex-[0.54] bg-gradient-to-br from-gray-400 to-gray-800 border-r-2 border-black  lg:rounded-l-lg flex flex-col">
          <div className="flex flex-row gap-1.5">
            <LottieClient
              animationData={require("@/app/animations/anime.json")}
              loop={true}
              className="size-10 mb-4 hover:scale-105 transition-transform duration-300"
            />
            <h5 className="mt-4 sm:mt-3 text-[12px] sm:text-[15px] mb-1 font-bold">
              Senpai Central
            </h5>
          </div>
          <h1 className="text-[20px]  ml-4 font-bold  text-gray-600">
            Welcome Back
          </h1>
          <h3 className="text-3xl ml-4 mt-4 font-semibold text-black">
            Sign In
          </h3>
          <form>
            <div className="flex flex-col gap-2 m-4">
              <label htmlFor="username">Username</label>
              <div className="bg-white h-10 w-full  flex items-center p-1 rounded-lg justify-between ">
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  onChange={handleChange}
                  value={loginForm.username}
                  placeholder="Username/Email"
                  className="w-full outline-none bg-transparent "
                />
                <span className="mr-1 pointer-events-none">👤</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 m-4">
              <label htmlFor="password">Password</label>
              <div className="bg-white h-10 w-full flex items-center p-1 rounded-[5px] justify-between">
                <input
                  type={hiddenPassword ? "password" : "text"}
                  name="password"
                  id="password"
                  required
                  onChange={handleChange}
                  value={loginForm.password}
                  placeholder="*********"
                  className="w-full outline-none bg-transparent items-center "
                />
                <span onClick={handleEyeClick} className="mr-1">
                  {hiddenPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>
            </div>
            <div className="w-full flex justify-center mt-5"><button className="bg-blue-700 w-auto p-3 rounded-lg text-white mt-5 hover:bg-blue-800 transition-all duration-300 ease-in-out">SIGN IN</button></div>

            <div className="flex flex-row items-center h-max mt-5 p-2.5 justify-center">
              
              <div className="flex w-[60%] items-center justify-center px-3 py-2  hover:bg-slate-800 hover:text-white rounded-md shadow-md hover:shadow-lg bg-white transition-all duration-300 ease-in-out">
                <button onClick={() => console.log("clicking")}>
                  <GoogleIcon className="text-red-600 md:!size-8 mr-4 mb-1 " /> Google
                </button>
              </div>
             
            </div>
            <div className="ml-4 mt-3 font-bold"><h6>Do not have Account <Link href="/sign_up" className="text-blue-300 text-[20px] ml-2 hover:text-blue-800 hover:underline transition-all duration-300 ease-in-out">Sign-Up</Link></h6></div>
          </form>
        </div>
        <div className="flex-[0] lg:flex-[0.46]  ">
          {images && (
            <img
              className="w-full h-full object-cover"
              src={image}
              alt="random anime images"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
