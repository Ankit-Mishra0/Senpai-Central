"use client"
import React from "react";
import Description from "./components/Description";
import Heading from "./components/Heading";
import NavBar from "./components/NavBar";
import NewsType from "./components/NewsType";
import Particles from "./components/Particle";
import fireAnimation from "./animations/fire.json";
import crownAnimation from "./animations/crown.json";
import youtubeAnimation from "./animations/youtube.json";
import Trendingnews from "./components/Trendingnews";
import AnimeRankings from "./components/AnimeRankings";
import AnimeTrailers from "./components/AnimeTrailers";
import Footer from "./components/Footer";

export default function Home() {
  const [newsLoaded, setNewsLoaded] = React.useState(false);
  return (
    <div className="relative bg-black w-full min-h-screen flex flex-col items-center overflow-hidden">
      <Particles
        className={"particles-fixed"}
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={1000}
        particleSpread={20}
        speed={0.1}
        particleBaseSize={50}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <NavBar />
      <Heading />
      <Description />
      {newsLoaded&&<NewsType
        type="Trending News"
        animationData={fireAnimation}
        animationClassName="w-8 h-8 mr-1 mb-2"
       href="/news?category=trending"
      />}
      <Trendingnews onLoadComplete={() => setNewsLoaded(true)}/>
      {newsLoaded&&<NewsType
        type="Anime Trailers"
        animationData={youtubeAnimation}
        animationClassName="w-8 h-8 mr-1 ml-0 mt-1 mb-1"
        href="/trailers"
      />}
      <AnimeTrailers />
     {newsLoaded&& <NewsType
        type="Anime Rankings"
        animationData={crownAnimation}
        animationClassName="w-8 h-8 mr-1 ml-0 mt-1 mb-1"
        href="/news?category=Ranking"
      />}
      <AnimeRankings />
      {newsLoaded&&<Footer/>}
      
    </div>
  );
}
