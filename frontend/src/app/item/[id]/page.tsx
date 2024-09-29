'use client'

import Button from '@/src/components/Button';
import { Container, Item, Items } from '@/src/components/Hero';
import { getAllProducts, getSpecificProducts, IProducts } from '@/src/utils/fetchAPI';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ItemDetailed = ({ params }: { params: { id: string } }) => {
    const [productDetail, setProductDetail] = useState<IProducts>();
    const [products, setProducts] = useState<IProducts[]>([]);
    const { id } = params;



    useEffect(() => {
        const fetchData = async () => {
            try {

                const product = await getSpecificProducts(id);
                const res = await getAllProducts(4);
                setProductDetail(product);
                setProducts(res);

            } catch (err) {
                console.log("Fetching Data Failed in Product Detail")
            }
        }
        fetchData();
    }, [])

    if (!productDetail) return <h1>Loading...</h1>

    return (
        <Container>
            <div className='w-full h-screen'>
                <Details productDetail={productDetail} />
                <SimilarProducts products={products} />
            </div>
        </Container>

    )
}

const Details = ({ productDetail }: { productDetail: IProducts }) => {
    const { id, title, price, description, image, rating, category } = productDetail
    const sizes = ['S', 'M', 'L', 'XL'];
    return (
        <div className='flex flex-col justify-center items-center h-auto py-4'>
            <div className='flex justify-around'>
                <Image src={image} alt={title} width={80} height={80} className='w-auto md:h-80 h-40 aspect-auto' />
                <div className='w-[50%] space-y-4'>
                    <h1 className='font-bold sm:text-2xl text-lg'>{title}</h1>
                    <h3 className='text-gray-500 my-4 text-xs'>{description}</h3>
                    <p className='font-semibold md:text-3xl text-xl pt-8 '>${price}</p>
                    <button className='px-4 py-2 bg-primary text-white rounded-md'>Add To The Cart<FontAwesomeIcon icon={faPlus} className='size-4 text-gray-200 ml-2' /></button>

                    {
                        category === "men's clothing" || category === "women's clothing" ?
                            <div className='flex gap-2 items-center'>
                                <h1>Size: </h1>
                                {sizes.map((size) => (
                                    <div className='flex h-10 w-10 border rounded-lg hover:border-primary hover:cursor-pointer'>
                                        <h1 className='mx-auto my-auto'>{size}</h1>
                                    </div>
                                ))}
                            </div> : <h1></h1>
                    }
                </div>
            </div>
        </div>
    )
}

const SimilarProducts = ({ products }: { products: IProducts[] }) => {
    return (
        <div>
            <Items>
                <div className="flex justify-between md:mx-8 mx-2 items-center">

                    <h1 className="text-xl font-bold ">Similar Products</h1>
                    <a className="text-sm text-blue-600 hover:underline hover: cursor-pointer   ">See More</a>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                    {products?.map((datas) => (
                        <Item id={datas.id} image={datas.image} price={datas.price} title={datas.title} rate={datas.rating.rate} />
                    ))}
                </div>
            </Items>
        </div>
    )
}



export default ItemDetailed;
