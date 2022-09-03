import React from 'react'
import Delivery from '../assets/images/delivery.png'
import HeroBg from '../assets/images/heroBg.png'
import { heroData } from '../utils/data'

const HomeContainer = () => {
  return (
    <section id="home" className="grid grid-cols-1 md:grid-cols-2 w-full">
      <div className="py-4 md:py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-3 py-2 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              alt="bike"
              className="w-full h-full object-contain "
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[3.75rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{' '}
          <span className="text-orange-600 text-[3rem] lg:text-[4.25rem] ">
            Your City
          </span>
        </p>
        <p className="md:w-10/12 text-base text-textColor text-center md:text-left">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          alias in a nihil eaque beatae sapiente vitae, expedita vero aspernatur
          delectus ullam maiores reprehenderit sit pariatur sint ratione. Hic,
          reprehenderit?
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100">
          Order Now
        </button>
      </div>
      <div className="relative py-2 flex-1 flex items-center">
        <img
          src={HeroBg}
          alt="hero"
          className="ml-auto w-full md:h-[490px] lg:w-auto lg:h-[610px]"
        />
        <div className="absolute w-full md:w-[350px] lg:w-full h-full top-0 md:-left-5 flex flex-wrap gap-4 md:gap-6 items-center justify-center py-[50px] lg:py-6">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="w-[156px] h-[155px] lg:w-[195px] lg:h-[195px] p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
                <img
                  src={n.imageSrc}
                  alt={n.name}
                  className="w-24 lg:w-36 -mt-12 lg:-mt-20"
                />
                <p className=" text-sm md:text-base lg:text-lg font-bold md:font-semibold text-textColor mt-2">
                  {n.name}
                </p>
                <p className="text-xs lg:text-sm font-semibold text-lightTextGray my-1 lg:my-2">
                  {n.desc}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-red-600">$</span> {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default HomeContainer
