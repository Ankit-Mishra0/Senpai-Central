import React from "react";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./footer.css"
const Footer = () => {
  return (
    <div className="relative flex flex-col items-center bg-gradient-to-b from-gray-300 w-full h-100 mt-17 text-white rounded-lg">
      <div className="absolute bg-gradient-to-t from-gray-700 to-gray-100 w-[90%] h-[70%] xl:w-[70%] xl:h-[70%] md:w-[80%] md:h-[65%] -top-6 rounded-lg shadow-black transition-all duration-300 ease-in-out shadow-xl hover:-top-7 hover:shadow-2xl">
        <div className="relative flex flex-col items-center justify-center">
         
          <div className="ft mt-3 font-extrabold text-3xl md:text-4xl lg:text-5xl">
            Senpai Central
          </div>
          <div className="dt font-bold mt-3 text-sm text-center md:text-2xl lg:text-2xl">
            Your hub for the latest anime news, trailers, and rankings.
          </div>
          <div className="relative w-full flex flex-row gap-4 justify-center items-center h-[100%]">
            <Image
              src="/narutosasuke.png"
              alt="naruto"
              width={110}
              height={110}
              className="absolute hidden lg:block  -top-3 left-0"
            ></Image>
            <div className=" flex flex-row justify-between items-center gap-8 mt-4">
              <a
                href="https://www.linkedin.com/in/ankit-mishra-3728b2286"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="!size-10 text-blue-600 hover:-translate-y-2" />
              </a>
              <a
                href="https://github.com/Ankit-Mishra0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="!size-10 inline-block text-black hover:-translate-y-2 " />
              </a>
              <a
                href="https://www.instagram.com/03m.ankit/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="!size-10 inline-block text-red-800 hover:-translate-y-2 " />
              </a>
            </div>
            <Image
              alt="goku"
              src="/gokuvegeta.png"
              width={90}
              height={90}
              className="absolute hidden lg:block  -top-3 right-1"
            ></Image>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center text-sx text-white mt-4">
          News sourced from
          <a
            href="https://www.cbr.com/"
            target="_blank"
            rel="noopener noreferrer "
            className="underline ml-1 font-bold text-amber-400"
          >
            {" "}
            CBR{" "}
          </a>
        </div>
        <div className="flex flex-row justify-center items-center text-sx text-black mt-5">
          &copy; {new Date().getFullYear()} Senpai Central. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
