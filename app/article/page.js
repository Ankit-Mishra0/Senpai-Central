"use client";
import React, { Suspense } from "react";
import Particles from "../components/Particle";
import FullNews from "./components/FullNews";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Page = () => {
  const [Load, setLoad] = React.useState(false);
  return (
    <div className="bg-black min-h-screen relative w-full flex flex-col items-center">
      <Particles
        className="particles-fixed"
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
      <Suspense fallback={null}>
        <FullNews onLoad={() => setLoad(true)} />
      </Suspense>

      {Load && <Footer />}
    </div>
  );
};

export default Page;
