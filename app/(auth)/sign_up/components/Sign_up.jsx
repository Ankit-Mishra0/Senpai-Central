"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
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

const Sign_up = () => {
  const [image, setImage] = useState(images[0]);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [loginForm, setLoginForm] = useState({
    username: "",
    email: "",
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
    <div className="flex flex-col items-center justify-center h-screen relative">
      <h2 className="text-5xl text-gray-300 m-2">SIGN UP</h2>
      <div className="flex flex-row bg-white w-[70%] h-[80%] rounded-lg">
          <div className="flex-[0.46] ">
          {images && (
            <img
              className="w-full h-full object-cover"
              src={image}
              alt="random anime images"
            />
          )}
        </div>
        <div className="flex-[0.54] bg-gradient-to-br from-gray-400 to-gray-800 border-l-2 border-black  rounded-r-lg flex flex-col ">
          <div className="flex flex-row gap-1.5 ">
            
            <LottieClient
              animationData={require("@/app/animations/anime.json")}
              loop={true}
              className="size-10 mb-4 hover:scale-105 transition-transform duration-300"
            />
            <h5 className="mt-4 sm:mt-3 text-[12px] sm:text-[15px] mb-1 font-bold">
              Senpai Central
            </h5>
            
          </div >
          
          <h1 className="text-[20px]  ml-4 font-bold  text-gray-600">
            Join Us
          </h1>
          <h3 className="text-3xl ml-4 mt-4 font-semibold text-black">
            Sign Up
          </h3>
        
          <form>
            <div className="flex flex-col gap-2 m-4">
              <label htmlFor="username">Username</label>
              <div className="bg-white h-10 w-full  flex items-center p-1 rounded-lg justify-between">
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  onChange={handleChange}
                  value={loginForm.username}
                  placeholder="Username"
                  className="w-full outline-none bg-transparent "
                />
                <span className="mr-1 pointer-events-none">👤</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 m-4">
              <label htmlFor="email">Email</label>
              <div className="bg-white h-10 w-full  flex items-center p-1 rounded-lg justify-between">
                <input
                  type="text"
                  name="email"
                  id="email"
                  required
                  onChange={handleChange}
                  value={loginForm.email}
                  placeholder="Email"
                  className="w-full outline-none bg-transparent "
                />
                <span className="mr-1 pointer-events-none">📧</span>
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
            <div className="w-full flex justify-center mt-3"><button className="bg-blue-700 w-auto p-3 rounded-lg text-white mt-5 hover:bg-blue-800 transition-all duration-300 ease-in-out">SIGN UP</button></div>

            <div className="flex flex-row  gap-5 items-center h-max mt-5 p-2.5 justify-between">
              <div className="flex w-[30%] items-center gap-2 px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md shadow-md hover:shadow-xl bg-white transition-all duration-300 ease-in-out  ">
                <button onClick={() => console.log("clicking")}>
                  <FacebookIcon className="text-blue-500 !size-8 mr-4 mb-1 ml-1"  /> Facebook
                </button>
              </div>
              <div className="flex w-[30%] items-center gap-2 px-3 py-2  hover:bg-slate-800 hover:text-white rounded-md shadow-md hover:shadow-lg bg-white transition-all duration-300 ease-in-out">
                <button onClick={() => console.log("clicking")}>
                  <GoogleIcon className="text-red-600 !size-8 mr-4 mb-1 ml-1" /> Google
                </button>
              </div>
              <div className="flex w-[30%] items-center gap-2 px-3 py-2  hover:bg-slate-800 hover:text-white rounded-md shadow-md hover:shadow-lg bg-white transition-all duration-300 ease-in-out group">
                {" "}
                <button onClick={() => console.log("clicking")}>
                  <AppleIcon className="text-black !size-[34px] mr-4 m ml-1 group-hover:text-amber-50" /> Apple
                </button>
              </div>
            </div>
            <div className="ml-4  font-bold"><h6>Already have an Account <Link href="/login" className="text-blue-300 text-[20px] ml-2 hover:text-blue-800 hover:underline transition-all duration-300 ease-in-out">Sign-In</Link></h6></div>
          </form>
        </div>
      
      </div>
    </div>
  );
};

export default Sign_up;
