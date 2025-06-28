"use client";
import React, { use } from "react";
import "./NavBar.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LottieClient = dynamic(() => import("./LottieClient"), {
  ssr: false,
});

const NavBar = () => {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = React.useState(false);
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="flex flex-row items-center justify-between bg-transparent w-full h-14 p-4 mx-auto mt-2 mb-4">
      <Link href="/"><div className="Lottie ">
        <LottieClient
          animationData={require("../animations/anime.json")}
          loop={true}
          className="size-17  border-b-1 mb-2 "
        />
      </div></Link>
      <div className="hidden md:flex flex-row gap-5 items-center mb-2 mx-auto outline-none">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={pathname === "/" ? "#a855f7" : "white"}
            className="inline-block size-9 svg outline-none"
            aria-label="Home"
            role="img"
            tabIndex="0"
          >
            <title>Home</title>
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
        </Link>
        <Link href="/news">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={pathname === "/news" ? "#a855f7" : "white"}
            className="inline-block size-9 svg outline-none"
            aria-label="News"
            role="img"
            tabIndex="0"
          >
            <title>News</title>
            <path
              fillRule="evenodd"
              d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
              clipRule="evenodd"
            />
            <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
          </svg>
        </Link>
        <Link href="/trailers">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={pathname === "/trailers" ? "#a855f7" : "white"}
            className="inline-block size-9 svg outline-none"
            aria-label="trailers"
            role="img"
            tabIndex="0"
          >
            <title>Anime Trailer</title>
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <Link href="/contact-us">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={pathname === "/contact-us" ? "#a855f7" : "white"}
            className="inline-block size-9 svg outline-none"
            aria-label="contact-us"
            role="img"
            tabIndex="0"
          >
            <title>Contact Us</title>
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
      {/* <div className="hidden md:flex">
        <Link href="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={pathname === "/login" ? "#a855f7" : "white"}
            className="inline-block  size-9 svg outline-none"
            aria-label="login"
            role="img"
            tabIndex="0"
          >
            <title>Login</title>
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div> */}
      {/* on mobile nav */}
      <div className="md:hidden " onClick={toggleNav}>
        {!navOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="inline-block size-9 Msvg outline-none"
            aria-label="Menu"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="inline-block size-9 Msvg outline-none"
            aria-label="Close Menu"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {navOpen && (
          <div className="absolute top-20 left-0 w-full bg-black flex flex-col items-center gap-6 py-4 z-50 md:hidden">
            <Link href="/" onClick={() => setNavOpen(false)}>
              <span
                className={`text-lg  ${
                  pathname === "/" ? "text-purple-500" : "text-white"
                }`}
              >
                Home
              </span>
            </Link>
            <Link href="/news" onClick={() => setNavOpen(false)}>
              <span
                className={`text-lg ${
                  pathname === "/news" ? "text-purple-500 " : "text-white"
                }`}
              >
                News
              </span>
            </Link>
            <Link href="/trailers" onClick={() => setNavOpen(false)}>
              <span
                className={`text-lg ${
                  pathname === "/trailers" ? "text-purple-500" : "text-white"
                }`}
              >
                Trailers
              </span>
            </Link>
            <Link href="/contact-us" onClick={() => setNavOpen(false)}>
              <span
                className={`text-lg ${
                  pathname === "/contact-us" ? "text-purple-500" : "text-white"
                }`}
              >
                Contact Us
              </span>
            </Link>
            {/* <Link href="/login" onClick={() => setNavOpen(false)}>
              <span
                className={`text-lg ${
                  pathname === "/login" ? "text-purple-500" : "text-white"
                }`}
              >
                Login
              </span>
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
