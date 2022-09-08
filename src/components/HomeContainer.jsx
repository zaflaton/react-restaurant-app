import React from 'react'
import Delivery from '../assets/images/delivery.png'
import HeroBg from '../assets/images/heroBg.png'
import { heroData } from '../utils/data'

const HomeContainer = () => {
  return (
    <section id="home" className="grid w-full grid-cols-1 md:grid-cols-2">
      <div className="flex flex-1 flex-col items-start justify-center gap-6 py-4 md:py-2">
        <div className="flex items-center justify-center gap-2 rounded-full bg-orange-100 px-3 py-2">
          <p className="text-base font-semibold text-orange-500">
            Bike Delivery
          </p>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-white drop-shadow-xl">
            <img
              src={Delivery}
              alt="bike"
              className="h-full w-full object-contain "
            />
          </div>
        </div>
        <p className="text-[2.5rem] font-bold tracking-wide text-headingColor lg:text-[3.75rem]">
          The Fastest Delivery in{' '}
          <span className="text-[3rem] text-orange-600 lg:text-[4.25rem] ">
            Your City
          </span>
        </p>
        <p className="text-center text-base text-textColor md:w-10/12 md:text-left">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          alias in a nihil eaque beatae sapiente vitae, expedita vero aspernatur
          delectus ullam maiores reprehenderit sit pariatur sint ratione. Hic,
          reprehenderit?
        </p>

        <button
          type="button"
          className="w-full rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 px-4 py-2 transition-all duration-100 ease-in-out hover:shadow-lg md:w-auto">
          Order Now
        </button>
      </div>
      <div className="relative flex flex-1 items-center py-2">
        <img
          src={HeroBg}
          alt="hero"
          className="ml-auto w-full md:h-[490px] lg:h-[610px] lg:w-auto"
        />
        <div className="absolute top-0 flex h-full w-full flex-wrap items-center justify-center gap-4 py-[50px] md:-left-5 md:w-[350px] md:gap-6 lg:w-full lg:py-6">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="flex h-[155px] w-[156px] flex-col items-center justify-center rounded-3xl bg-cardOverlay p-4 drop-shadow-lg backdrop-blur-md lg:h-[195px] lg:w-[195px]">
                <img
                  src={n.imageSrc}
                  alt={n.name}
                  className="-mt-12 w-24 lg:-mt-20 lg:w-36"
                />
                <p className=" mt-2 text-sm font-bold text-textColor md:text-base md:font-semibold lg:text-lg">
                  {n.name}
                </p>
                <p className="my-1 text-xs font-semibold text-lightTextGray lg:my-2 lg:text-sm">
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
