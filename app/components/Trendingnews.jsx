"use client";
import React from "react";
import "./scroll.css";
import TiltedCard from "./Cards";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const LottieClient = dynamic(() => import("./LottieClient"), {
  ssr: false,
});

function Trendingnews({onLoadComplete}) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true)
    fetch("/api/anime-t-news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Error fetching news:", err))
      .finally(() => {
        setLoading(false);
        onLoadComplete();
      });
  }, [onLoadComplete]);

  if (loading)
    return (
      <div className="w-full flex flex-col justify-center items-center ">
        {" "}
        <div className="Lottie ">
          <LottieClient
            animationData={require("../animations/loading.json")}
            loop={true}
            className="size-100 mb-4 ml-[45px] hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    );
  if (!news.length) return <p>No news found.</p>;
  return (
    <div className="trend relative w-full flex flex-row flex-nowrap gap-4 p-2  ">
      {news.slice(0, 10).map((item, index) => (
        <TiltedCard
          key={index}
          title={item.title}
          image={item.image}
          desc={item.description}
          url={item.url}
        />
      ))}
    </div>
  );
}

export default Trendingnews;
