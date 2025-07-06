import React from 'react'
import Particles from "../components/Particle";
import NavBar from '../components/NavBar';
import AllTrailers from './component/AllTrailers';
const Page = props => {
    
  return (
    <div  className="bg-black min-h-screen relative w-full flex flex-col items-center">
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
      <AllTrailers />
      
    </div>
  )
}

export default Page