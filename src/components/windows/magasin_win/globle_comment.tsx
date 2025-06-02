import { GlobelReviews } from '@/lib/stores_api';
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { getDateDifference } from '@/lib/tools/tools';
import { MdOutlineStar } from 'react-icons/md';

export default function GlobleComment({ comment }: { comment: number }) {

    const [comments, setComments] = useState<number | null>(null)
    const [orderData, setOrderData] = useState<ReviewType[] | null>(null);

    useEffect(() => {
        const fetchOrderInfo = async () => {
            const data = await GlobelReviews(comment); // Fetch order info
            if (data && data.totalAct > 0) {
                setOrderData(data.result); // Update state with the fetched data
                setComments(comment + 1);
            } else {
                setComments(null)
            }
        };

        fetchOrderInfo(); // Call the async function
    }, [comment]); // Re-run effect when `id` changes

    const handlePlus = async () => {
        const data = await GlobelReviews(comments!);

        if (data) {
            setOrderData((prevState) => {
                return [...prevState || [], ...data.result]; // Adds new data to the existing array
            });
            setComments(comments! + 1)
        } else {
            setComments(null)
        }
    }

    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 py-8 bg-opacity-50 bg-slate-700'>
            <div className='xl:w-2/3 w-full mx-auto max-h-full overflow-auto rounded-xl px-2 py-5 md:p-10 mt-16 bg-white'>
                <h1 className='mb-5 text-xl text-center font-bold'>Commentaires</h1>
                <div className="space-y-6">
                    {orderData?.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
                            <div className="flex items-start gap-3">
                                <Image
                                    width={100}
                                    height={100}
                                    src={comment.client.image_url ? `${process.env.NEXT_PUBLIC_IMGS_DOMAIN}${comment.client.image_url}` : "/placeholder.svg"}
                                    alt={`${comment.client.first_name}'s avatar`}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">{comment.client.first_name}</h3>
                                            <span className="text-sm text-gray-500">{getDateDifference(comment.created_at)}</span>
                                            {comment.star &&
                                                <span className='flex items-center'>{comment.star}<MdOutlineStar className='text-lg text-gold6' /></span>
                                            }
                                        </div>
                                    </div>
                                    <p className="mt-1 text-gray-800 p-1 break-all">{comment.commentaire}</p>
                                    <div className="flex items-center gap-4 mt-3">
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )
                    }
                </div>
                {comments ?
                    <span onClick={handlePlus} className='flex justify-center cursor-pointer'>
                        <p className='border rounded-md px-2 py-1'>voir plus</p>
                    </span>
                    :
                    orderData ?
                        <span className='flex justify-center'>Il n&apos;y a plus de commentaires</span>
                        :
                        <span className='flex justify-center'>Il n&apos;y a pas de commentaires</span>
                }
            </div>
        </div>
    )
}
