"use client";
import React from "react";
import "./scroll.css";
import he from "he";
import Trailers_Cards from "./trailer_card";
const AnimeTrailers = () => {
  const [trailers, setTrailers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("api/YT-Trailers")
      .then((res) => res.json())
      .then((data) => {
        setTrailers(data);
      })
      .catch((err) => console.error("Error fetching trailers:", err))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <p>Loading trailers...</p>;
  if (!trailers.length) return <p>No trailers found.</p>;
  return (
    <div className="trend relative w-full flex flex-row flex-nowrap gap-4 p-2  ">
      {trailers
       
        .filter((trailer) => {
          return (
            trailer.title?.toLowerCase().includes("trailer") &&
            !trailer.title?.toLowerCase().includes("game")
          );
        })
        .map((trailer, index) => {
          const videoId = trailer.video_id;
          const title = he.decode(trailer.title);
          if (!videoId) return null;
          return <Trailers_Cards videoId={videoId} title={title} key={index} />;
        })}
    </div>
  );
};

export default AnimeTrailers;
