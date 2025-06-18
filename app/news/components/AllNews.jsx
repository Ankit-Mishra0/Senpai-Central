"use client";
import Cards from "@/app/components/Cards";
import React from "react";
import dynamic from "next/dynamic";
const LottieClient = dynamic(() => import("../../components/LottieClient"), {
  ssr: false,
});
const AllNews = () => {
  const [newsType, setNewsType] = React.useState("News");
  const [loading, setLoading] = React.useState(true);
  const [articles, setArticles] = React.useState([]);
  const fetchNews = () => {
    setLoading(true);
    let route = "";
    switch (newsType) {
      case "trending":
        route = "/api/anime-t-news";

        break;
      case "News":
        route = "/api/all-anime-news";
        break;
      case "Ranking":
        route = "/api/anime-rank";
        break;
    }
    fetch(route)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Error fetching news:", err))
      .finally(() => setLoading(false));
  };
  React.useEffect(() => {
    fetchNews();
  }, [newsType]);

  return (
    <div className="w-full">
      <div className=" relative flex flex-row w-full h-10 items-center gap-6 justify-center text-white p-4 mt-3 mx-auto text-[20px] font-bold cursor-pointer">
        <div
          onClick={() => {
            setNewsType("trending");
            console.log("trending");
          }}
          className={
            newsType == "trending"
              ? "text-red-500 border-b-2 hover:-translate-y-2 hover:text-2xl transition-all duration-300 ease-in-out"
              : "text-white hover:-translate-y-2 hover:text-2xl transition-all duration-300 ease-in-out"
          }
        >
          Treanding News
        </div>
        <div
          onClick={() => {
            setNewsType("News");
            console.log("News");
          }}
          className={
            newsType == "News"
              ? "text-red-500 border-b-2 hover:-translate-y-2 hover:text-2xl transition-all duration-300 ease-in-out"
              : "text-white hover:-translate-y-2 hover:text-2xl transition-all duration-300 ease-in-out"
          }
        >
          News
        </div>
        <div
          onClick={() => {
            setNewsType("Ranking");
            console.log("Ranking");
          }}
          className={
            newsType == "Ranking"
              ? "text-red-500 border-b-2 hover:-translate-y-2 hover:text-2xl transition-all duration-300 ease-in-out"
              : "text-white hover:-translate-y-2 hover:text-2xl transition-all duration-300 ease-in-out"
          }
        >
          Rankings
        </div>
      </div>
      {loading ? (
        <div className="min-h-screen flex flex-col justify-center items-center">
          {" "}
          <div className="Lottie ">
            <LottieClient
              animationData={require("../../animations/loading.json")}
              loop={true}
              className="size-100 mb-4 ml-30 mt-10 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ) : articles.length == 0 ? (
        <p className="text-white">No articles found.</p>
      ) : (
        <div className="relative w-full h-full flex flex-wrap items-center justify-center mt-3 mb-3 gap-6 p-2 ">
          {articles.map((item, index) => (
            <Cards
              key={index}
              title={item.title}
              url={item.url}
              image={item.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllNews;
