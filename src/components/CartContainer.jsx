import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri'

import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import EmptyCart from '../assets/images/emptyCart.svg'
import CartItem from './CartItem'

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue()
  const [flag, setFlag] = useState(1)
  const [tot, setTot] = useState(0)

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    })
  }

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price
    }, 0)
    setTot(totalPrice)
    console.log(tot)
  }, [tot, flag, cartItems])

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    })

    localStorage.setItem('cartItems', JSON.stringify([]))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="md:w-375 fixed top-0 right-0 z-[101] flex h-screen w-full flex-col bg-white drop-shadow-md">
      <div className="flex w-full cursor-pointer items-center justify-between p-4">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-3xl text-textColor" />
        </motion.div>
        <p className="text-lg font-semibold text-textColor">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="my-2 flex cursor-pointer items-center gap-2 rounded-md bg-gray-100 p-1 px-2  text-base text-textColor hover:shadow-md"
          onClick={clearCart}>
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="flex h-full w-full flex-col rounded-t-[2rem] bg-cartBg">
          {/* cart Items section */}
          <div className="h-340 md:h-42 scrollbar-none flex w-full flex-col gap-3 overflow-y-scroll px-6 py-10">
            {/* cart Item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="flex w-full flex-1 flex-col items-center justify-evenly rounded-t-[2rem] bg-cartTotal px-8 py-2">
            <div className="flex w-full items-center justify-between">
              <p className="text-lg text-gray-400">Sub Total</p>
              <p className="text-lg text-gray-400">$ {tot}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-lg text-gray-400">Delivery</p>
              <p className="text-lg text-gray-400">$ 2.5</p>
            </div>

            <div className="my-2 w-full border-b border-gray-600"></div>

            <div className="flex w-full items-center justify-between">
              <p className="text-xl font-semibold text-gray-200">Total</p>
              <p className="text-xl font-semibold text-gray-200">
                ${tot + 2.5}
              </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="my-2 w-full rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 p-2 text-lg text-gray-50 hover:shadow-lg">
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="my-2 w-full rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 p-2 text-lg text-gray-50 hover:shadow-lg">
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl font-semibold text-textColor">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default CartContainer
