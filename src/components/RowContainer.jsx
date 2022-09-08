import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import NotFound from '../assets/images/NotFound.svg'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef()

  const [items, setItems] = useState([])

  const [{ cartItems }, dispatch] = useStateValue()

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue
  }, [scrollValue])

  useEffect(() => {
    const addtocart = () => {
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: items,
      })
      localStorage.setItem('cartItems', JSON.stringify(items))
    }
    addtocart()
  }, [dispatch, items])

  return (
    <div
      ref={rowContainer}
      className={`my-12 flex w-full items-center  gap-3 scroll-smooth  ${
        flag
          ? 'scrollbar-none overflow-x-scroll'
          : 'flex-wrap justify-center overflow-x-hidden'
      }`}>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 md:w-300 relative my-12 flex  h-[175px] min-w-[275px] flex-col items-center  justify-evenly rounded-lg bg-cardOverlay py-2 px-4 backdrop-blur-lg hover:drop-shadow-lg md:min-w-[300px]">
            <div className="flex w-full items-center justify-between">
              <motion.div
                className="-mt-8 h-40 w-40 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}>
                <img
                  src={item?.imageURL}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="-mt-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-600 hover:shadow-md"
                onClick={() => setItems([...cartItems, item])}>
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="-mt-8 flex w-full flex-col items-end justify-end">
              <p className="text-base font-semibold text-textColor md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg font-semibold text-headingColor">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <img src={NotFound} className="h-[340px]" alt="notfound" />
          <p className="my-2 text-xl font-semibold text-headingColor">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  )
}

export default RowContainer
