import { faBars, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useHandleMenu } from "../hooks/useHandleMenu";
import Link from "next/link";

const Bars = () => {


    const { activeMenu, handleMenu } = useHandleMenu();
    const MenuItem = [
        {
            id: 1,
            name: "Home",
            icon: null,
            option: null,
            path: '/'

        },
        {
            id: 2,
            name: "Products",
            icon: null,
            option: null,
            path: '/products'
        },
        {
            id: 3,
            name: "Account",
            icon: faUser,
            option: null,
            path: '/api/auth/login'
        },
        {
            id: 4,
            name: "Language",
            icon: null,
            option: ["English", "Thai", "Chinese"],
            path: '/'
        },

    ]

    return (
        <>
            <FontAwesomeIcon icon={faBars} onClick={handleMenu} className="size-6 sm:hidden cursor-pointer" />

            <div className={`min-h-full sm:hidden min-w-[75%] z-30 fixed bg-white left-0 top-0 transition-all duration-150 ease-in-out ${activeMenu ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="h-16 border border-t">
                    <div className="h-10 w-10 absolute flex justify-center flex-col items-center right-6 top-3">
                        <FontAwesomeIcon icon={faX} onClick={handleMenu} className=" size-4 cursor-pointer" />
                    </div>
                </div>
                {
                    MenuItem.map((items) => (
                        <div className="h-14 border border-t items-center flex px-6 justify-between ">
                            <Link className="flex items-center space-x-2 " href={items.path}>
                                <FontAwesomeIcon icon={items.icon} />
                                <h2 className="cursor-pointer">{items.name}</h2>
                            </Link>
                            {
                                items.option &&
                                <div>
                                    <select name="English" id="English">
                                        {
                                            items.option.map((item) => (
                                                <option value={item}>{item}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>

            {
                activeMenu && <div className="fixed sm:hidden z-10 inset-0 bg-gradient-to-tr from-transparent  to-slate-800/30" />
            }
        </>
    )
}

export default Bars