"use client";
import React from "react";
import "./scroll.css";
import TiltedCard from "./Cards";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const LottieClient = dynamic(() => import("./LottieClient"), {
  ssr: false,
});

const AnimeRankings = () => {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);   
    useEffect(()=>{
        fetch("/api/anime-rank")
        .then((res)=>res.json())
        .then((data)=>setRankings(data))
        .catch((err)=>console.error("Error fetching rankings:", err))
        .finally(() => setLoading(false));
    },[]);
  return (
   <div className="trend relative w-full flex flex-row flex-nowrap gap-4 p-2 ">
      {rankings.slice(0,10).filter((item)=>{
        const match=item.title&&item.title.match(/\d+/);
        return !match||parseInt(match[0],10)<=10;
      }).map((item, index) => (
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

export default AnimeRankings
