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
  useEffect(() => {
    if (!article?.body) return;
    const container = document.querySelector(".prose");
    if (!container) return;
    const tables = container.querySelectorAll("table");
    tables.forEach((table) => {
      const headers = Array.from(table.querySelectorAll("thead th")).map(
        (th) => th.textContent
      );
      table.querySelectorAll("tbody tr").forEach((row) => {
        row.querySelectorAll("td").forEach((td, i) => {
          if (headers[i]) td.setAttribute("data-label", headers[i]);
        });
      });
    });
  }, [article]);

  if (loading)
    return (
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
