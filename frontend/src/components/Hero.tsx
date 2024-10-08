"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { getAllProducts, getCategories, IProducts } from "../utils/fetchAPI";
import Image from "next/image";
import { faDollarSign, faS, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Hero = () => {
    const [data, setData] = useState<IProducts[]>();
    const [category, setCategory] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            const products = await getAllProducts(4);
            const categorys = await getCategories();
            setData(products);
            setCategory(categorys)
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Categories>
                {category.map((s: string) => (
                    <div className="border px-4 py-1 rounded-md hover:border-primary hover:cursor-pointer  max-sm:max-md:hidden">{s}</div>
                ))}
            </Categories>
            <Advertise />
            <Items>
                <div className="flex justify-between md:mx-8 mx-4 items-center">

                    <h1 className="text-xl font-bold ">Best Sale</h1>
                    <a className="text-sm text-blue-600 hover:underline hover: cursor-pointer   ">See More</a>
                </div>
<<<<<<< Updated upstream
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                    {data?.map((datas) => (
                        <Item id={datas.id} image={datas.image} price={datas.price} title={datas.title} rate={datas.rating.rate} />
=======
                <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
                    {data?.slice(0, 3).map((datas, i) => (
                        <Item key={i} id={datas.id} image={datas.image} price={datas.price} title={datas.title} rate={datas.rating.rate} />
>>>>>>> Stashed changes
                    ))}
                </div>

            </Items>
        </Container>
    )
};

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
    return (
<<<<<<< Updated upstream
        <div className="flex flex-col justify-center items-center w-full lg:w-[70rem] h-64 rounded-md bg-gray-100">
            <h1>Advertisement</h1>
=======
        <div className="relative w-full h-96 flex flex-col items-center justify-center rounded-md border">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in"
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
>>>>>>> Stashed changes
        </div>
    )
}

export const Items = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-gray-100 rounded-md py-4 space-y-2 hover:cursor-pointer ">
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
        <section className="w-auto md:h-auto h-auto border bg-white rounded-sm">
            <Link href={`/item/${id.toString()}`}>
                <div className="w-full space-y-4 mt-4 flex flex-col justify-around items-center">
                    <Image src={image} width={80} height={70} alt={title} className="aspect-auto w-auto md:h-60 h-40 flex justify-center" />
                    <div className="space-y-1 w-full p-4 border-t">
                        <p className="font-bold text-lg">$ {price}</p>

                        <h1 className="text-sm w-[80%] h-10 overflow-hidden">{title}</h1>
                        <div className="flex items-center space-x-1">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                            <p className="text-gray-500">{rate}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    )
}


export default Hero;
