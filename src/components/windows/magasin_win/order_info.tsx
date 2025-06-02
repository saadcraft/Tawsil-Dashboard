import { getComInfo } from '@/lib/stores_api'
import React, { useEffect, useState } from 'react'
import Image from "next/image"

export default function OrderInfo({ id, total }: { id: number, total: number }) {

    const [orderData, setOrderData] = useState<OrderItem[] | null>(null);

    // const totalSum = orderData?.reduce((acc, item) => {
    //     // Convert `subtotal` to a number and add it to the accumulator
    //     return acc + parseFloat(item.subtotal);
    // }, 0); // Start with an initial value of 0

    useEffect(() => {
        const fetchOrderInfo = async () => {
            const data = await getComInfo(id); // Fetch order info
            if (data) {
                setOrderData(data); // Update state with the fetched data
            }
        };

        fetchOrderInfo(); // Call the async function
    }, [id]); // Re-run effect when `id` changes

    // console.log(orderData); // Log the fetched data

    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='xl:w-2/3 w-full mx-auto rounded-xl py-5 px-2 md:p-10 mt-10 bg-white'>
                <h1 className='mb-5 text-xl text-center font-bold'>Informations de commande</h1>
                <div className='flex flex-col gap-3'>
                    {orderData?.map(pre => {
                        return (
                            <div key={pre.id} className='border-2 p-2 rounded-md'>
                                <div className='flex justify-between items-center'>
                                    <div className="relative w-16 h-16 shrink-0">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMGS_DOMAIN}${pre.article.image}`}
                                            alt="Product image"
                                            className="object-cover rounded-md"
                                            fill
                                            priority
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 ml-2">
                                        <h3 className="font-medium text-lg truncate">{pre.article.name}</h3>
                                        <p className="text-sm font-semibold text-primary">{pre.article.price} DA</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <p>Quantité :</p>
                                        <span className="text-sm w-8 text-center">{pre.quantity}</span>
                                    </div>
                                </div>
                                {pre.specific &&
                                    <p className='text-yellow-600 text-sm font-bold p-1 bg-yellow-100 rounded-md border-2 border-yellow-600'>**{pre.specific}</p>

                                }
                            </div>
                        )
                    })}
                    <span className='text-right font-bold text-xl truncate'>Total: {total} DA</span>
                </div>
            </div>
        </div >
    )
}
