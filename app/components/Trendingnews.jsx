"use client";
import React from "react";
import "./scrollNews.css";
import TiltedCard from "./Cards";
import { useState, useEffect } from "react";

function Trendingnews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/anime-t-news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Error fetching news:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (!news.length) return <p>No news found.</p>;
  return (
    <div className="trend relative w-full flex flex-row flex-nowrap gap-4 p-2  ">
      {news.slice(0,10).map((item, index) => (
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
