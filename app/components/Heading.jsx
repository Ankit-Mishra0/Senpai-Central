import React from "react";
import RotatingText from "./react-rotating-text";
import "./Heading.css";
const Heading = () => {
  return (
    <div className="relative ">
      <div className="text-2xl lg:text-6xl md:text-5xl sm:text-4xl font-bold mt-1 md:mt-7  gradient-text ">
        Konnichiwa{" "}
        <RotatingText
          texts={["Otaku!", "Anime Fans!", "Weebs!"]}
          rotationInterval={2000}
          staggerDuration={0}
          mainClassName="gradient-text "
        />{" "}
      </div>

      <div className="text-2xl lg:text-6xl md:text-5xl sm:text-4xl font-bold mt-1 md:mt-7 new-text">
        Konnichiwa{" "}
        <RotatingText
          texts={["Otaku!", "Anime Fans!", "Weebs!"]}
          rotationInterval={2000}
          staggerDuration={0}
          mainClassName="gradient-text  "
        />{" "}
      </div>
    </div>
  );
};

export default Heading;
