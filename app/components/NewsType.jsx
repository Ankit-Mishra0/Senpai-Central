"use client";
import React from "react";
import dynamic from "next/dynamic";

const LottieClient = dynamic(() => import("./LottieClient"), {
  ssr: false,
});

const NewsType = ({ type, animationData,animationClassName  }) => {
  return (
    <div className="w-full mt-7 mb-1">
      <h1 className="inline-flex items-center w-auto ml-1 text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-700 text-black rounded px-2 py-1 ">
        {animationData && (
          <div className={animationClassName}>
            <LottieClient animationData={animationData} />
          </div>
        )}
        {type}
      </h1>
    </div>
  );
};

export default NewsType;
