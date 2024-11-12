"use client";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faBell,
  faCartShopping,
  faMagnifyingGlass,
  faSun,
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

  const Icons = [<DarkMode />, <MagnificationGlass />, <Bell />, <Cart_shopping />, <Login />]


  return (

    <NavbarContext.Provider value={{ activeNavbar, setActiveNavbar }} >
      <div className="w-full relative h-16 flex justify-center bg-support_primary">

        <div className="w-full h-16 flex justify-around max-sm:justify-between items-center px-12">
          <Logo />
          <FontAwesomeIcon icon={faBars} className="size-6 sm:hidden" />
          <NavbarItem />

          <div className="flex space-x-9 items-center max-sm:hidden">
            {Icons.map((icon) => icon)}
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
  }]

  const context = useContext(NavbarContext);

  if (!context) {
    return null;
  }
  const { activeNavbar, setActiveNavbar } = context;

  return (
    <div className={`space-x-10 flex max-sm:hidden`}>
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
          <FontAwesomeIcon icon={faUser} className="size-6 text-primary" />
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

const Cart_shopping = () => {

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faCartShopping}
        className="size-6 text-primary "
      />
    </div>
  )
}
const DarkMode = () => {

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faSun}
        className="size-6 text-primary "
      />
    </div>
  )
}

const MagnificationGlass = () => {

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="size-6 text-primary "
      />
    </div>
  )
}


const Bell = () => {

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faBell}
        className="size-6 text-primary "
      />
    </div>
  )
}

const Logo = () => {
  return (
    <div className="flex sm:space-x-4 sm:flex-row-reverse items-center ">

      <h1 className={`font-bold text-4xl text-primary ${poppins.className} italic`}>LOGO</h1>
    </div>
  )
}

export default Navbar;
