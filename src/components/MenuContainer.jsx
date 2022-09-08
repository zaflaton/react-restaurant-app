import React, { useState } from 'react'
import { IoFastFood } from 'react-icons/io5'
import { categories } from '../utils/data'
import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'

const MenuContainer = () => {
  const [filter, setFilter] = useState('chicken')

  const [{ foodItems }] = useStateValue()

  return (
    <section className="my-6 w-full" id="menu">
      <div className="flex w-full flex-col items-center justify-center">
        <p className="before:content relative mr-auto from-orange-400 to-orange-600 text-2xl font-semibold capitalize text-headingColor transition-all duration-100 ease-in-out before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-16 before:rounded-lg before:bg-gradient-to-tr">
          Our Hot Dishes
        </p>

        <div className="scrollbar-none flex w-full items-center justify-start gap-8 overflow-x-scroll py-6 lg:justify-center">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? 'bg-cartNumBg' : 'bg-card'
                } flex h-28 w-24 min-w-[94px] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg drop-shadow-xl hover:bg-cartNumBg `}
                onClick={() => setFilter(category.urlParamName)}>
                <div
                  className={`h-10 w-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? 'bg-white'
                      : 'bg-cartNumBg'
                  } flex items-center justify-center group-hover:bg-white`}>
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? 'text-textColor'
                        : 'text-white'
                    } text-lg group-hover:text-textColor`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? 'text-white'
                      : 'text-textColor'
                  } group-hover:text-white`}>
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  )
}

export default MenuContainer
