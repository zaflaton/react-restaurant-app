import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import twitter from '../assets/icons/twitter.svg'
import instagram from '../assets/icons/instagram.svg'
import facebook from '../assets/icons/facebook.svg'
import Logo from '../assets/images/logo.png'

const Footer = () => {
  return (
    <div className="z-50 flex w-screen flex-col items-center gap-6 bg-orange-100 px-4 py-6 md:flex-row md:items-start md:gap-10 md:py-8 md:px-16">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-between md:items-start">
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-xl font-bold text-headingColor"> City Market</p>
        </Link>

        <p className="mt-2 w-56 text-textColor">
          We promise our customers to get the best quality food and products
          always.
        </p>
      </div>
      <div className="flex flex-1 flex-col items-start">
        <motion.ul
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}>
          <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
            Home
          </li>
          <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
            Menu
          </li>
          <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
            Service
          </li>
          <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
            About Us
          </li>
          <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
            Terms & conditions
          </li>
        </motion.ul>
      </div>
      <div className="flex-1 ">
        <p className="text-textColor">Contact Us</p>
        <p className="text-textColor">contact@citymarket.com</p>
        <div className="mt-3 flex justify-center gap-9 lg:justify-start">
          <motion.img
            whileTap={{ scale: 0.75 }}
            src={twitter}
            alt="twitter"
            className="h-10 w-10 rounded-xl bg-blue-300 p-[5px] transition-all duration-100 ease-in-out hover:shadow-lg"
          />
          <motion.img
            whileTap={{ scale: 0.75 }}
            src={instagram}
            alt="instagram"
            className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-400 to-red-500 p-1 transition-all duration-100 ease-in-out hover:shadow-lg"
          />
          <motion.img
            whileTap={{ scale: 0.75 }}
            src={facebook}
            alt="facebook"
            className="h-10 w-10 rounded-xl bg-blue-400 p-1 transition-all duration-100 ease-in-out hover:shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
