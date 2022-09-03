import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import twitter from '../assets/icons/twitter.svg'
import instagram from '../assets/icons/instagram.svg'
import facebook from '../assets/icons/facebook.svg'
import Logo from '../assets/images/logo.png'

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start z-50 w-screen px-4 py-6 md:py-8 md:px-16 bg-orange-100">
      <div className="flex flex-1 w-full h-full flex-col items-center md:items-start justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold"> City Market</p>
        </Link>

        <p className=" w-56 mt-2 text-textColor">
          We promise our customers to get the best quality food and products
          always.
        </p>
      </div>
      <div className="flex flex-1 flex-col items-start">
        <motion.ul
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}>
          <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
            Home
          </li>
          <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
            Menu
          </li>
          <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
            Service
          </li>
          <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
            About Us
          </li>
          <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
            Terms & conditions
          </li>
        </motion.ul>
      </div>
      <div className="flex-1 ">
        <p className="text-textColor">Contact Us</p>
        <p className="text-textColor">contact@citymarket.com</p>
        <div className="flex gap-9 mt-3 lg:justify-start justify-center">
          <img
            src={twitter}
            alt="logo"
            className="w-10 h-10 p-[5px] bg-blue-300 rounded-xl"
          />
          <img
            src={instagram}
            alt="logo"
            className="w-10 h-10 p-1 bg-gradient-to-tr from-orange-400 to-red-500 rounded-xl"
          />
          <img
            src={facebook}
            alt="logo"
            className="w-10 h-10 p-1 bg-blue-400 rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
