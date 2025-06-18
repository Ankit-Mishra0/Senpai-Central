"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./FullNews.css";
import dynamic from "next/dynamic";
const LottieClient = dynamic(() => import("../../components/LottieClient"), {
  ssr: false,
});

const FullNews = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const title = searchParams.get("title");
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (url) {
      fetch(`/api/full-article?url=${encodeURIComponent(url)}`)
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching article:", err);
        });
    }
  }, [url]);
  if (loading)
    return (
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
    );
  if (!article) return <p>No article found.</p>;

  return (
    <div className="bg-transparent min-h-screen relative">
      <div className="p-4 bg-transparet text-white max-w-4xl  mx-auto">
        <h1 className=" heading text-3xl font-extrabold  text-purple-400">
          {title}
        </h1>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="mb-4 w-full rounded"
          />
        )}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </div>
    </div>
  );
};

export default FullNews;
