import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineShoppingCart, MdAdd, MdLogout } from 'react-icons/md'
import { motion } from 'framer-motion'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { app } from '../firebase.config'

import Logo from '../assets/images/logo.png'
import Avatar from '../assets/images/avatar.png'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const Header = () => {
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue()

  const [isMenu, setIsMenu] = useState(false)

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider)
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      })
      localStorage.setItem('user', JSON.stringify(providerData[0]))
    } else {
      setIsMenu(!isMenu)
    }
  }

  const closeMenu = () => {
    setIsMenu(false)
  }

  const logout = () => {
    setIsMenu(false)
    localStorage.clear()

    dispatch({
      type: actionType.SET_USER,
      user: null,
    })
  }

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    })
  }

  return (
    <header className="fixed z-50 w-screen bg-primary p-4 drop-shadow-md md:py-2 md:px-16">
      {/* desktop & tablet */}
      <div className="hidden h-full w-full items-center justify-between md:flex">
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-xl font-bold text-headingColor"> City Market</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8">
            <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
              Home
            </li>
            <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
              Menu
            </li>
            <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
              About Us
            </li>
            <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
              Service
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}>
            <MdOutlineShoppingCart className="cursor-pointer  text-2xl text-textColor transition-all duration-100 ease-in-out hover:text-headingColor " />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-cartNumBg">
                <p className="text-xs font-semibold text-white">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative flex flex-col items-center justify-center gap-1">
            <motion.img
              whileTap={{ scale: 0.7 }}
              src={user ? user.photoURL : Avatar}
              alt="userProfile"
              className="h-10 min-h-[40px] w-10 min-w-[40px] cursor-pointer rounded-full drop-shadow-xl"
              onClick={login}
            />
            <p>
              {user
                ? `Hi, ${user.displayName.split(' ').slice(-1).join(' ')}`
                : null}
            </p>
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute top-11 -right-2 mt-1 flex w-40 flex-col rounded-lg bg-gray-50 shadow-xl">
                {user && user.email === 'zaflaton@gmail.com' && (
                  <Link to={'/createItem'}>
                    <p
                      className="flex cursor-pointer items-center gap-4 px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100"
                      onClick={closeMenu}>
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="flex cursor-pointer items-center gap-4 px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100"
                  onClick={logout}>
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* {mobile} */}
      <div className="flex h-full w-full items-center justify-between md:hidden">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}>
          <MdOutlineShoppingCart className="cursor-pointer  text-2xl text-textColor transition-all duration-100 ease-in-out hover:text-headingColor" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-cartNumBg">
              <p className="text-xs font-semibold text-white">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8  object-cover" />
          <p className="text-xl font-bold text-headingColor"> City Market</p>
        </Link>
        <div className="relative flex flex-col items-center justify-center gap-1">
          <motion.img
            whileTap={{ scale: 0.7 }}
            src={user ? user.photoURL : Avatar}
            alt="userProfile"
            className="h-10 min-h-[40px] w-10 min-w-[40px] cursor-pointer rounded-full drop-shadow-xl"
            onClick={login}
          />
          <p className="text-sm">
            {user
              ? `Hi, ${user.displayName.split(' ').slice(-1).join(' ')}`
              : null}
          </p>
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-11 -right-1 flex w-40 flex-col rounded-lg bg-gray-50 shadow-xl">
              {user && user.email === 'zaflaton@gmail.com' && (
                <Link to={'/createItem'}>
                  <p className="m-2 flex cursor-pointer items-center justify-center gap-3 rounded-md bg-gray-200 px-4 py-2 text-base text-textColor shadow-md transition-all duration-100 ease-in-out hover:bg-gray-300">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li
                  className="cursor-pointer gap-4 px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100 hover:text-headingColor"
                  onClick={closeMenu}>
                  Home
                </li>
                <li
                  className="cursor-pointer gap-4 px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100 hover:text-headingColor"
                  onClick={closeMenu}>
                  Menu
                </li>
                <li
                  className="cursor-pointer gap-4 px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100 hover:text-headingColor"
                  onClick={closeMenu}>
                  About Us
                </li>
                <li
                  className="cursor-pointer gap-4 px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100 hover:text-headingColor"
                  onClick={closeMenu}>
                  Service
                </li>
              </ul>
              <p
                className="m-2 flex cursor-pointer items-center justify-center gap-3 rounded-md bg-gray-200 px-4 py-2 text-base text-textColor shadow-md transition-all duration-100 ease-in-out hover:bg-gray-300"
                onClick={logout}>
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
