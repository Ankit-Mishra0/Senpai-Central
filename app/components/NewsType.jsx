"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const LottieClient = dynamic(() => import("./LottieClient"), {
  ssr: false,
});

const NewsType = ({ type, animationData, animationClassName, href }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="w-full flex flex-row justify-between mt-7 mb-1">
      <h1 className="inline-flex items-center w-auto ml-1 text-xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-700 text-black rounded px-2 py-1 ">
        {animationData && (
          <div className={animationClassName}>
            <LottieClient animationData={animationData} />
          </div>
        )}
        {type}
      </h1>
      <Link href={href}>
        <button
          onClick={() => setClicked(true)}
          disabled={clicked}
          className="relative bg-gradient-to-r from-pink-400 to-purple-700 text-white rounded-2xl px-4 py-2 h-auto mr-1 text-sm md:text-lg font-semibold hover:scale-105 transition-all duration-300 ease-in-out mt-2 hover:from-pink-500 hover:to-purple-800"
        >
          View All
        </button>
      </Link>
    </div>
  );
};

export default NewsType;
