import Particles from '@/app/components/Particle'
import React from 'react'
import Sign_up from './components/Sign_up'


const page = () => {
  return (
    <div className="relative bg-black w-full min-h-screen">
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={2000}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={70}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
 
     <Sign_up/>
     

     
    </div>
  )
}

export default page
