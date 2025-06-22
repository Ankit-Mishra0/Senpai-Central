"use client";
import React, { use } from "react";
import "./Cards.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Cards = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    router.push(
      `/article?url=${encodeURIComponent(props.url)}&title=${encodeURIComponent(
        props.title
      )}`
    );
  };
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="cards  m-0.5 relative bg-gradient-to-t to-gray-500 p-2 overflow-hidden shrink-0 w-64 h-80 rounded-md border border-gray-400 flex flex-col items-center  "
        onMouseMove={handleMouseMove}
      >
        <div className="w-full h-40 z-10">
          <img
            src={props.image}
            alt="news Image"
            className="w-full h-full object-cover border-b-1 border-b-gray-500"
          />
        </div>
        <div className="z-10">
          <h2 className="text-white font-bold mt-2">{props.title}.</h2>
        </div>
      </div>
    </>
  );
};

export default Cards;
