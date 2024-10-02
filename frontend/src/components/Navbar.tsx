"use client";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useHandleMenu } from "../hooks/useHandleMenu";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { NavbarContext } from "../context/navbarContext";

export const poppins = Poppins({
  subsets: ["latin"], // You can also add 'latin-ext' or other subsets if needed
  weight: ["400", "500", "700"], // Specify the font weights you want to use
  style: ["normal", "italic"], // Optionally, add italic if needed
  display: "swap",
})

const Navbar = () => {
  const { activeMenu, handleMenu } = useHandleMenu();

  const [activeNavbar, setActiveNavbar] = useState<number>(1);


  return (

    <NavbarContext.Provider value={{ activeNavbar, setActiveNavbar }} >
      <div className="w-full relative z-10 h-16 flex justify-center">

        <div className="w-full h-14 flex justify-between items-center px-12">
          <Logo handleMenu={handleMenu} />
          <NavbarItem />
          {/* For Mobile MagnifyingGlass Icon */}
          <div className="flex space-x-8  items-center">
            <Basket />
            <Login />
          </div>
        </div>
        {activeMenu && (
          <div className="fixed sm:hidden inset-0 bg-gradient-to-tr from-transparent  to-slate-300/30" />
        )}
      </div>
    </NavbarContext.Provider>
  );
};

const NavbarItem = () => {

  const items = [{
    id: 1, label: 'Home'
  }, {
    id: 2, label: 'Products'
  }, {
    id: 3, label: 'About'
  }, {
    id: 4, label: 'Contact'
  },]

  const context = useContext(NavbarContext);

  if (!context) {
    return null;
  }
  const { activeNavbar, setActiveNavbar } = context;

  return (
    <div className={`space-x-10 flex`}>
      {items.map((item) => (
        <h1 id={item.id.toString()} onClick={() => setActiveNavbar(item.id)} className={`${activeNavbar === item.id ? "text-primary" : "text-black"} hover:cursor-pointer`}>{item.label}</h1>
      ))}
    </div>
  )
}


const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <>
      {isLogin ?
        <Avatar />
        : <Link href={"/login"}>
          <FontAwesomeIcon icon={faUser} className="size-6 text-gray-600" />
        </Link>}
    </>
  )
}

const Avatar = () => {

  // if the user upload image -> dispaly image

  // if not -> dispaly only words 

  const NAME = "Wai Yan Aung";

  function getInitialsWord(name: string) {
    const initials = name.split(' ').map((i) => i.charAt(0).toUpperCase()).join('')
    const twoWords = initials.substring(0, initials.length - 1)
    return twoWords
  }

  return (
    <div className="px-2 py-2 items-center border rounded-full border-black">{getInitialsWord(NAME)}</div>
  )
}

const Basket = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  function handleHover() {
    setIsHover(!isHover)
  }
  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faBagShopping}
        onMouseLeave={handleHover}
        onMouseEnter={handleHover}
        className="size-6 text-gray-600 "
      />
      {isHover &&
        <h1 className="py-1 px-2 rounded-sm bg-gray-300 absolute top-6 text-xs -left-4">Basket</h1>
      }
    </div>
  )
}

const Logo = ({ handleMenu }: { handleMenu: () => void }) => {
  return (
    <div className="flex sm:space-x-4 sm:flex-row-reverse items-center ">

      <h1 className={`font-bold text-3xl text-primary ${poppins.className} italic`}>LOGO</h1>
    </div>
  )
}

export default Navbar;
