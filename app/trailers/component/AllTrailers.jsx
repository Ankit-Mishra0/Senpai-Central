"use client";
import React from "react";
import dynamic from "next/dynamic";
import SearchIcon from "@mui/icons-material/Search";
import he from "he";
import Trailers_Cards from "@/app/components/trailer_card";

const LottieClient = dynamic(() => import("../../components/LottieClient"), {
  ssr: false,
});
const AllTrailers = () => {
  const [trailers, setTrailers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    fetch("api/YT-Trailers")
      .then((res) => res.json())
      .then((data) => {
        setTrailers(data);
      })
      .catch((err) => console.error("Error fetching trailers:", err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="w-full">
      {loading ? (
        <div className="min-h-screen flex flex-col justify-center items-center">
          {" "}
          <div className="Lottie ">
            <LottieClient
              animationData={require("../../animations/loading.json")}
              loop={true}
              className="size-100 mb-4 ml-[45px] hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ) : trailers.length === 0 ? (
        <p></p>
      ) : (
        <div>
          {" "}
          <div className="relative flex items-center justify-center ">
            <div className="absolute h-8 bg-gradient-to-r from-pink-400 via-purple-600 to-blue-800 text-white outline-none mt-5 sm:w-[30%] rounded-xl text-center p-0.5 text-lg font-bold z-0 transform -translate-x-4 blur-lg animate-[pulse_8s_linear_infinite]"></div>
            <input
              className=" bg-gradient-to-r from-gray-400 to-gray-600 text-white outline-none mt-5 sm:w-[30%] rounded-xl text-center p-0.5 text-lg font-bold z-1"
              type="text"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            ></input>
            <span className="text-white mt-5 ml-1">
              <SearchIcon />
            </span>
          </div>
          <div className="relative w-full h-full flex flex-wrap items-center justify-center mt-4 mb-3 gap-6 p-2 ">
            {trailers
              .filter((item) => {
                const title =
                  item.title?.split(" ").join("").toLowerCase() || "";
                if (!title.includes("trailer") || title.includes("game"))
                  return false;
                if (!search.trim()) return true;
                const Search = search.split(" ").join("").toLowerCase();
                return title.includes(Search);
              })
              .map((item, index) => {
                const videoId = item.video_id;
                const title = he.decode(item.title);
                if (!videoId) return null;
                return (
                  <Trailers_Cards videoId={videoId} title={title} key={index} />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTrailers;
