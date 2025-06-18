"use client";
import React from "react";
import Lottie from "lottie-react";

const LottieClient = ({ animationData, className }) => {
  return (
    <Lottie animationData={animationData} loop={true} className={className} />
  );
};

export default LottieClient;
