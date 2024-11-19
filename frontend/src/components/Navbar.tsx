"use client";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import Bars from "./Bars";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../counter/store";

export const poppins = Poppins({
  subsets: ["latin"], // You can also add 'latin-ext' or other subsets if needed
  weight: ["400", "500", "700"], // Specify the font weights you want to use
  style: ["normal", "italic"], // Optionally, add italic if needed
  display: "swap",
})

const Navbar = () => {


  const [activeNavbar, setActiveNavbar] = useState<number>(1);

  const Icons = [<Bell />, <Login />]


  return (

    <NavbarContext.Provider value={{ activeNavbar, setActiveNavbar }} >
      <div className="w-full relative h-16 flex justify-center bg-support_primary">

        <div className="w-full h-16 flex sm:justify-around justify-between px-4 items-center ">
          <div className="flex flex-row-reverse items-center gap-4 pl-4">

            <Logo />
            <Bars />
          </div>
          <NavbarItem />
          <div className="flex space-x-9">

            <Cart_shopping />
            <div className="flex space-x-9 items-center max-sm:hidden">
              {Icons.map((icon) => icon)}
            </div>
          </div>
        </div>
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
        : <Link href={"/api/auth/login"}>
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
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <div>{cart.totalQuantity}</div>
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
