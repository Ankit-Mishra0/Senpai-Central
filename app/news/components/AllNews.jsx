"use client";
import Cards from "@/app/components/Cards";
import React from "react";
import dynamic from "next/dynamic";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "next/navigation";
const LottieClient = dynamic(() => import("../../components/LottieClient"), {
  ssr: false,
});
const AllNews = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [newsType, setNewsType] = React.useState(category || "News");
  const [loading, setLoading] = React.useState(true);
  const [articles, setArticles] = React.useState([]);
  const [search, setSearch] = React.useState("");

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
              className="size-100 mb-4 ml-[45px] hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ) : articles.length == 0 ? (
        <p className="text-white">No articles found.</p>
      ) : (
        <div className="">
          <div className="relative flex items-center justify-center ml-6">
            <div className="absolute h-8 bg-gradient-to-r from-pink-400 via-purple-600 to-blue-800 text-white outline-none mt-5 w-[60%] sm:w-[30%] rounded-xl text-center p-0.5 text-lg font-bold z-0 transform -translate-x-4 blur-lg animate-[pulse_8s_linear_infinite]"></div>
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
          {newsType != "Ranking" ? (
            <div className="relative w-full h-full flex flex-wrap items-center justify-center mt-4 mb-3 gap-6 p-2 ">
              {articles
                .filter((item) => {
                  if (!search.trim()) return true;
                  const Search = search.split(" ").join("").toLowerCase();
                  const description =
                    item.description?.toLowerCase().split(" ").join("") || "";
                  const title = item.title?.toLowerCase().split(" ").join("");
                  return description.includes(Search) || title.includes(Search);
                })
                .map((item, index) => (
                  <Cards
                    key={index}
                    title={item.title}
                    url={item.url}
                    image={item.image}
                  />
                ))}
            </div>
          ) : (
            <div className="relative w-full h-full flex flex-wrap items-center justify-center mt-4 mb-3 gap-6 p-2 ">
              {articles
                .filter((item) => {
                  const match = item.title && item.title.match(/\d+/);
                  const isTop10 = !match || parseInt(match[0], 10) <= 10;
                  if (!search.trim()) return isTop10;

                  const Search = search.split(" ").join("").toLowerCase();
                  const description =
                    item.description?.toLowerCase().split(" ").join("") || "";

                  const title = item.title?.toLowerCase().split(" ").join("");
                  return (
                    isTop10 &&
                    (description.includes(Search) || title.includes(Search))
                  );
                })
                .map((item, index) => (
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
      )}
    </div>
  );
};

export default AllNews;
