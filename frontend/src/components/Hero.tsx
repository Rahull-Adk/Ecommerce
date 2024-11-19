'use client';

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { getAllProducts, getCategories, IProducts } from "../utils/fetchAPI";
import Image from "next/image";
import { faArrowLeft, faArrowRight, faDollarSign, faS, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { poppins } from "./Navbar";
import SkeletonHeroBanner from "./SkeletonHeroBanner";
import { useDispatch } from "react-redux";
import { addToCart } from "../counter/cartSlice";

const roboto = Roboto_Condensed({
    subsets: ["latin"], // You can also add 'latin-ext' or other subsets if needed
    weight: ["400", "500", "700"], // Specify the font weights you want to use
    style: ["normal", "italic"], // Optionally, add italic if needed
    display: "swap",
})

const Hero = () => {
    const [data, setData] = useState<IProducts[]>();
    const [category, setCategory] = useState<any>();


    // Fetch All Products and Categories
    useEffect(() => {

        const fetchData = async () => {
            const datas = await getAllProducts();
            const categorys = await getCategories();
            setData(datas);
            setCategory(categorys);
        };
        fetchData();

    }, []);

    return (
        <Container>
            <div className="max-sm:hidden">
                {
                    data ? <HeroBanner data={data} /> : <SkeletonHeroBanner />
                }

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
            </div>
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
            <div className="space-y-16 my-16">
                {founders.map((f) => (
                    <div id={f.id.toString()} className={`${f.id % 2 === 0 ? "flex" : "flex flex-row-reverse"}  gap-36 space-y-4 items-center`}>
                        <div className="h-96 w-96 bg-black" />
                        <div className="space-y-8">
                            <h2 className="text-3xl font-medium text-center">{f.role}</h2>
                            <h4 className="w-[30rem] text-sm text-center">{f.description}</h4>
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
            <div className="w-full sm:w-[75%] space-y-8">
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

const HeroBanner = ({ data }: { data: IProducts[] }) => {



    return (
        <div className="grid grid-rows-1 grid-flow-col text-center bg-white">
            <div className="row-span-3 flex flex-col  border-r-2 border-primary justify-around items-center">
                <Image src={data[0].image} alt={data[0].title} width={100} height={100} className="aspect-auto h-56 w-auto" />
                <h1 className={`text-6xl w-80 font-semibold italic ${roboto.className}`}>Elevate Your Everyday</h1>
            </div>
            <div className="row-span-3 flex flex-col-reverse  border-r-2 border-primary justify-around items-center ">
                <Image src={data[1].image} alt={data[1].title} width={100} height={100} className="aspect-auto h-56 w-auto" />
                <h1 className={`text-6xl w-80 font-semibold italic ${roboto.className}`}>Unlock VIP Perks</h1>
            </div>
            <div>
                <div className="row-span-2 flex justify-center items-center  border-b-2 border-primary">
                    <Image src={data[2].image} alt={data[2].title} width={100} height={100} className="aspect-auto h-56 w-auto m-5" />
                </div>
                <div className="row-span-2 flex justify-center items-center">
                    <Image src={data[3].image} alt={data[3].title} width={100} height={100} className="aspect-auto h-56 w-auto m-5" />

                </div>
            </div>
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
        <div className="relative w-full h-80 flex flex-col items-center justify-center rounded-md ">
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
            <div className="flex space-x-3 h-20 items-center mt-5">
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

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: id,
            name: title,
            price: price,
            quantity: 1
        }));
    };
    return (
        <section className="w-auto md:h-auto text-center border h-auto bg-white rounded-sm">
            <div className="w-full space-y-4 mt-4 flex flex-col justify-around items-center">
                <Link href={`/item/${id.toString()}`}>
                    <Image src={image} width={80} height={70} alt={title} className="aspect-auto w-auto md:h-60 hover:scale-105 transition-all duration-100 ease-in h-40 flex justify-center" />
                </Link>
                <div className="py-4 w-full space-y-4 border-t flex flex-col justify-center items-center">
                    <div className="flex justify-between px-5 w-full">
                        <h1 className=" overflow-ellipsis w-40 h-6 text-start  overflow-hidden font-medium">{title}</h1>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faStar} className="size-4 text-yellow-500" />
                            <p className="text-gray-500 pl-1">{rate.toString().slice(0, 1)}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-5 w-full">
                        <p className={`${roboto.className} font-bold text-3xl text-primary`}>${price}</p>
                        <button onClick={handleAddToCart} className="w-32 h-12 px-2 py-1 bg-darkmode_support_primary text-white rounded-md font-bold">Buy Now</button>
                    </div>
                </div>
            </div>

        </section>
    )
}


export default Hero;
