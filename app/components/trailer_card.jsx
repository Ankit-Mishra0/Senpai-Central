"use client";
import React from "react";
import "./Cards.css";
const Trailers_Cards = (props) => {
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
        className="cards  m-0.5 relative bg-gradient-to-t to-gray-500 p-2 overflow-hidden shrink-0 w-74 h-80 rounded-md border border-gray-400 flex flex-col items-center  "
        onMouseMove={handleMouseMove}
      >
        <div className="w-full h-40 z-10">
          <iframe
            loading="lazy"
            width="100%"
            height="100%"
            className="p-0 "
            src={`https://www.youtube.com/embed/${props.videoId}`}
            title={props.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="z-11">
          <p className="text-white font-bold mt-2">{props.title}.</p>
        </div>
      </div>
    </>
  );
};

export default Trailers_Cards;
