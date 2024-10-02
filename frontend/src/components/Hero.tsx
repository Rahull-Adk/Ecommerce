"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { getAllProducts, getCategories, IProducts } from "../utils/fetchAPI";
import Image from "next/image";
import { faArrowLeft, faArrowRight, faDollarSign, faS, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { poppins } from "./Navbar";

const roboto = Roboto_Condensed({
    subsets: ["latin"], // You can also add 'latin-ext' or other subsets if needed
    weight: ["400", "500", "700"], // Specify the font weights you want to use
    style: ["normal", "italic"], // Optionally, add italic if needed
    display: "swap",
})

const Hero = () => {
    const [data, setData] = useState<IProducts[]>();
    const [category, setCategory] = useState<any>([]);
    const [electronics, setElectronic] = useState<IProducts[]>([]);

    // Fetch All Products and Categories
    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([getAllProducts(), getCategories()]).then((datas) => {
                setData(datas[0]);
                setCategory(datas[1]);
            })
        };
        fetchData();
    }, []);

    // Filter Electronic Products
    useEffect(() => {
        if (data) {
            const filteredProduct = data.filter((datas) => datas.category === category[0]);
            setElectronic(filteredProduct);
        }
    }, [data])


    return (
        <Container>

            <Advertise />
            <Items>
                <div className="flex justify-center items-center">
                    <h1 className={`${poppins.className} text-4xl font-medium`}>Our Products</h1>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
                    {data?.slice(0, 6).map((datas, i) => (
                        <Item key={i} id={datas.id} image={datas.image} price={datas.price} title={datas.title} rate={datas.rating.rate} />
                    ))}
                </div>
            </Items>
            <About />
            <Contact />
        </Container>
    )
};

const Contact = () => {
    return (
        <div className="flex justify-around items-center py-8">
            <h1 className="text-4xl font-medium py-8 ">Contact Us</h1>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col gap-1">

                    <label>Email: </label>
                    <input type="email" className="border bg-gray-100 py-1" />
                </div>
                <div className="flex flex-col gap-1">

                    <label>Full Name: </label>
                    <input type="text" maxLength={20} className="border bg-gray-100 py-1" />
                </div>
                <div className="flex-col flex gap-1">

                    <label>Descripton: </label>
                    <textarea rows={6} cols={50} className="border bg-gray-100" />
                </div>
            </div>
        </div>
    )
}

const About = () => {
    const founders = [{
        id: 1,
        role: "Frontend developer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }, { id: 2, role: "Backend Developer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " }]

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-4xl font-medium">About Us</h1>
            <div className="space-y-16 my-4">
                {founders.map((f) => (
                    <div id={f.id.toString()} className={`${f.id % 2 === 0 ? "flex" : "flex flex-row-reverse"}  gap-16 space-y-4 items-center`}>
                        <div className="h-96 w-96 bg-black" />
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">{f.role}</h2>
                            <h4 className="w-[20rem]">{f.description}</h4>
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full lg:w-[70rem] space-y-8">
                {children}
            </div>
        </div>
    )
}

const Categories = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex space-x-8 uppercase  justify-center my-4">
            {children}
        </div>
    )
}

const Advertise = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % advertisements.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + advertisements.length) % advertisements.length);
    };

    const advertisements = [{ url: '/svg_PNG/big-shopping-sale.svg', label: 'Promotions' }, { url: '/svg_PNG/sales.svg', label: 'Flash Sales' }, { url: '/svg_PNG/discount.svg', label: 'Discounts' }]
    return (
        <div className="relative w-full h-80 flex flex-col items-center justify-center rounded-md border">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {advertisements.map((text, i) => (
                        <div key={i} id={i.toString()} className="min-w-full flex justify-center items-center">
                            <img src={text.url} className="h-80 w-auto" />
                            <h1 className="uppercase text-4xl italic font-semibold underline">{text.label}</h1>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex space-x-3 h-20 items-center">
                {advertisements.map((a, i) => (
                    <div className={`p-[5px] cursor-pointer rounded-full  ${currentSlide === i ? "bg-primary" : "bg-black"}`} onClick={() => setCurrentSlide(i)} />
                ))}
            </div>
            <button onClick={prevSlide} className="absolute left-4 items-center top-1/2 transform -translate-y-1/2 p-2 text-white">

                <FontAwesomeIcon icon={faArrowLeft} className="size-4 text-primary" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white">
                <FontAwesomeIcon icon={faArrowRight} className="size-4 text-primary" />
            </button>
        </div>
    )
}

export const Items = ({ children }: { children: ReactNode }) => {
    return (
        <div className="rounded-md py-4 space-y-4 hover:cursor-pointer ">
            {children}
        </div>
    )
}

interface IItem {
    id: number,
    image: string,
    title: string,
    price: number,
    rate: number,
}

export const Item = ({ id, image, title, price, rate }: IItem) => {
    return (
        <section className="w-auto md:h-auto text-center border h-auto bg-white rounded-sm">
            <Link href={`/item/${id.toString()}`}>
                <div className="w-full space-y-4 mt-4 flex flex-col justify-around items-center">
                    <Image src={image} width={80} height={70} alt={title} className="aspect-auto w-auto md:h-60 hover:scale-105 transition-all duration-100 ease-in h-40 flex justify-center" />
                    <div className="space-y-2 w-full py-2 border-t flex flex-col justify-center items-center">

                        <h1 className="text-sm h-6 overflow-ellipsis w-44  overflow-hidden">{title}</h1>
                        <p className={`${roboto.className} font-semibold text-2xl`}>${price}</p>

                    </div>
                </div>
            </Link>
        </section>
    )
}


export default Hero;
