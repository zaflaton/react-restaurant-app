import React, { useEffect, useState } from 'react'
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'

const MainContainer = () => {
  const [{ foodItems, cartShow }] = useStateValue()
  const [scrollValue, setScrollValue] = useState(0)

  useEffect(() => {}, [scrollValue, cartShow])

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center ">
      <HomeContainer />

      <section className="my-6 w-full">
        <div className="flex w-full items-center justify-between">
          <p className="before:content relative from-orange-400 to-orange-600 text-2xl font-semibold capitalize text-headingColor transition-all duration-100 ease-in-out before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-32 before:rounded-lg before:bg-gradient-to-tr">
            Our fresh & healthy fruits
          </p>

          <div className="hidden items-center gap-3 md:flex">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center  rounded-lg bg-orange-300 hover:bg-orange-500 hover:shadow-lg"
              onClick={() => setScrollValue(-200)}>
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-orange-300 transition-all duration-100 ease-in-out hover:bg-orange-500 hover:shadow-lg"
              onClick={() => setScrollValue(200)}>
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === 'fruits')}
        />
      </section>

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  )
}

export default MainContainer
