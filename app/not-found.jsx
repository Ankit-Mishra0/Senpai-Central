"use client";
import React from "react";
import Particles from "./components/Particle";
import dynamic from "next/dynamic";
import NavBar from "./components/NavBar";

const LottieClient = dynamic(() => import("./components/LottieClient"), {
  ssr: false,
});

const NotFound = () => {
  return (
    <div className="flex flex-col items-center  h-screen bg-black relative overflow-hidden">
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={1000}
        particleSpread={20}
        speed={0.1}
        particleBaseSize={50}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <NavBar/>

      <div className="flex flex-col items-center justify-center h-full w-full text-center">
        <LottieClient
          animationData={require("./animations/anime.json")}
          loop={true}
          className="w-100 h-100 mb-4 hover:scale-105 transition-transform duration-300"
        />
        <h1 className="text-2xl  lg:text-5xl  md:text-4xl  sm:text-3xl   font-bold text-gray-800">
          404 - Page Not Found
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
