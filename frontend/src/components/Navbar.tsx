"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBasketShopping,
  faChevronDown,
  faList,
  faMagnifyingGlass,
  faUserCircle,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useHandleSearch } from "../hooks/useHandleSearch";
import { useHandleMenu } from "../hooks/useHandleMenu";
import { useHandleChevronDown } from "../hooks/useHandleChevronDown";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

interface IMenu {
  id: string;
  title: string;
  icon: IconProp;
  subMenu: string[];
}

const Navbar = () => {
  const { activeMenu, handleMenu } = useHandleMenu();
  const { active, handleSearchBar } = useHandleSearch();
  const [activeOutline, setActiveOutline] = useState<boolean>(false);
  function handleOutline() {
    setActiveOutline(!activeOutline);
  }

  return (
    <div className="w-full relative z-10 h-16 flex justify-center">
      <div className="w-full lg:w-[70rem] h-14 flex justify-between items-center ">
        <div className="flex sm:space-x-4 sm:flex-row-reverse items-center ">
          <div
            className="flex items-center space-x-1 sm:px-4  sm:hover:bg-secondary text-primary_text hover:text-support_primary py-2 mx-2 rounded-md"
            onClick={handleMenu}
          >
            <FontAwesomeIcon icon={faBars} className="size-5 sm:space-x-4" />
            <p className="max-sm:hidden cursor-pointer ">Menu</p>
          </div>
          <h1 className="font-bold text-2xl text-primary">Logo</h1>
        </div>
        <div
          onMouseLeave={handleOutline}
          className={`min-w-[20rem] md:min-w-[28rem] lg:min-w-[36rem] items-center px-4 rounded-md  max-sm:hidden flex bg-white ${activeOutline ? "border-primary" : "border-gray-400"} border`}
        >
          <input
            onClick={() => setActiveOutline(true)}
            type="text"
            className="h-8 w-full outline-none"
            placeholder="Search"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="size-4 text-black pl-4 border-l-2 border-gray-800"
          />
        </div>
        {/* For Mobile MagnifyingGlass Icon */}
        <div className="flex space-x-6  items-center mr-4">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="size-5 text-primary_text sm:hidden"
            onClick={handleSearchBar}
          />

          <FontAwesomeIcon
            icon={faBasketShopping}
            className="size-6 text-gray-600"
          />

          <Link href={"/login"}>
            <h3 className="text-primary border border-primary text-sm hover:bg-secondary hover:text-support_primary px-4  py-2 cursor-pointer rounded-md font-medium">
              Log In
            </h3>
          </Link>
          {/* <div className='flex items-center text-base bg-secondary px-3 py-2 space-x-2  text-white cursor-pointer rounded-md'>
            <p>EN</p>
            <FontAwesomeIcon icon={faCaretDown} className='size-4' />
          </div> */}
        </div>
      </div>
      <MobileSearchBar handleSearchBar={handleSearchBar} active={active} />
      <Menu handleMenu={handleMenu} activeMenu={activeMenu} />
      {activeMenu && (
        <div className="fixed sm:hidden inset-0 bg-gradient-to-tr from-transparent  to-slate-300/30" />
      )}
    </div>
  );
};

interface Menu {
  activeMenu: boolean;
  handleMenu: () => void;
}

const Menu = ({ handleMenu, activeMenu }: Menu) => {
  const { activeDown, activeItem, handleActiveDown } = useHandleChevronDown();

  const menus = [
    {
      id: "1",
      title: "Categories",
      icon: faList,
      subMenu: ["Mens", "Womens", "Acessories", "Shoes"],
    },
    {
      id: "2",
      title: "Account",
      icon: faUserCircle,
      subMenu: ["Profile"],
    },
  ];
  return (
    <section
      className={`absolute z-30 sm:text-support_primary sm:opacity-100 ${activeMenu ? "left-0 max-sm:translate-x-0 sm:translate-y-16" : "-left-full max-sm:-translate-x-full sm:-translate-y-full"} transition-transform duration-150 ease-in sm:ease-in-out max-sm:top-0 w-[60%] sm:w-full max-sm:min-h-screen sm:h-96  sm:bg-secondary bg-support_primary`}
    >
      <div>
        <div className="flex justify-end  sm:hidden items-center pr-4 h-16">
          <FontAwesomeIcon
            icon={faX}
            className="size-4 text-primary_text"
            onClick={handleMenu}
          />
        </div>
        <div className="sm:hidden ">
          {menus.map((menu: IMenu) => (
            <>
              <div
                id={menu.id}
                onClick={() => handleActiveDown(menu.id)}
                className={`flex h-12 bg-secondary justify-between px-4 items-center ${activeItem === menu.id ? "text-primary" : "text-primary_text"
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={menu.icon}
                    className="size-4 text-white"
                  />
                  <h4 className=" font-medium text-white">{menu.title}</h4>
                </div>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`size-3 text-support_primary ${activeItem === menu.id ? "rotate-180" : "rotate-0"
                    } transition-transform duration-100 ease-in`}
                />
              </div>
              <ul
                className={`w-[70%] px-4 flex flex-col items-start transition-all duration-100 ease-in overflow-hidden ${activeItem === menu.id ? " max-h-full my-4" : "max-h-0 "
                  } space-y-4`}
              >
                {menu.subMenu.map((submenu) => (
                  <li className="font-medium text-sm text-primary_text">
                    {submenu}
                  </li>
                ))}
              </ul>
            </>
          ))}
        </div>
      </div>
      <div className=" space-x-24 flex justify-center max-sm:hidden">
        {menus.map((menu) => (
          <div className="text-support_primary">
            <div className="flex items-center space-x-4 ">
              <FontAwesomeIcon
                icon={menu.icon}
                className="size-5 text-primary"
              />
              <h1 className="text-2xl font-semibold py-4">{menu.title}</h1>
            </div>
            <ul className="space-y-2 ml-9 cursor-pointer">
              {menu.subMenu.map((submenu) => (
                <li className="hover:underline">{submenu}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

interface MobileSearchBar {
  handleSearchBar: () => void;
  active: boolean;
}

const MobileSearchBar = ({ handleSearchBar, active }: MobileSearchBar) => {
  return (
    <div
      className={`w-full  flex flex-col justify-center  items-center absolute ${active ? "top-0 translate-y-0" : "-top-full -translate-y-full"} transition-transform duration-150 ease-in z-20  bg-secondary`}
    >
      <div className="w-full h-14 flex justify-evenly items-center">
        <input
          type="text"
          className="h-8 w-[80%]  outline-none pl-2 text-lg bg-secondary placeholder:text-gray-400  text-support_primary text-[1rem] font-medium"
          placeholder="Search"
        />
        <FontAwesomeIcon
          icon={faX}
          className="size-4 text-support_primary"
          onClick={handleSearchBar}
        />
      </div>
    </div>
  );
};

export default Navbar;
