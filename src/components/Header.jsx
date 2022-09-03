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
    <header className="fixed z-50 w-screen p-4 md:py-2 md:px-16 bg-primary drop-shadow-md">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold"> City Market</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8">
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              Service
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}>
            <MdOutlineShoppingCart className="text-textColor  hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer text-2xl " />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
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
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full drop-shadow-xl cursor-pointer"
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
                className="w-40 absolute top-11 -right-2 flex flex-col bg-gray-50 shadow-xl rounded-lg mt-1">
                {user && user.email === 'zaflaton@gmail.com' && (
                  <Link to={'/createItem'}>
                    <p
                      className="px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-all ease-in-out duration-100 text-textColor text-base"
                      onClick={closeMenu}>
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-all ease-in-out duration-100 text-textColor text-base"
                  onClick={logout}>
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* {mobile} */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}>
          <MdOutlineShoppingCart className="text-textColor  hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer text-2xl" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8  object-cover" />
          <p className="text-headingColor text-xl font-bold"> City Market</p>
        </Link>
        <div className="relative flex flex-col items-center justify-center gap-1">
          <motion.img
            whileTap={{ scale: 0.7 }}
            src={user ? user.photoURL : Avatar}
            alt="userProfile"
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full drop-shadow-xl cursor-pointer"
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
              className="w-40 absolute top-11 -right-1 flex flex-col bg-gray-50 shadow-xl rounded-lg">
              {user && user.email === 'zaflaton@gmail.com' && (
                <Link to={'/createItem'}>
                  <p className="m-2 px-4 py-2 flex items-center justify-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all ease-in-out duration-100 rounded-md shadow-md text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li
                  className="px-4 py-2 gap-4 text-base text-textColor hover:text-headingColor hover:bg-slate-100 transition-all ease-in-out duration-100 cursor-pointer"
                  onClick={closeMenu}>
                  Home
                </li>
                <li
                  className="px-4 py-2 gap-4 text-base text-textColor hover:text-headingColor hover:bg-slate-100 transition-all ease-in-out duration-100 cursor-pointer"
                  onClick={closeMenu}>
                  Menu
                </li>
                <li
                  className="px-4 py-2 gap-4 text-base text-textColor hover:text-headingColor hover:bg-slate-100 transition-all ease-in-out duration-100 cursor-pointer"
                  onClick={closeMenu}>
                  About Us
                </li>
                <li
                  className="px-4 py-2 gap-4 text-base text-textColor hover:text-headingColor hover:bg-slate-100 transition-all ease-in-out duration-100 cursor-pointer"
                  onClick={closeMenu}>
                  Service
                </li>
              </ul>
              <p
                className="m-2 px-4 py-2 flex items-center justify-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all duration-100 ease-in-out rounded-md shadow-md text-textColor text-base"
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
