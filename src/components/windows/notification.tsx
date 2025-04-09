"use client"

import React, { useEffect, useState } from 'react'
import { RiLoader3Fill } from 'react-icons/ri'
import { getDateDifference } from '@/lib/tools/tools'
import Link from 'next/link';
import LoadingFirst from '../loading';
import { useSearchParams } from 'next/navigation';

type Notification = {
    id: number;
    client__username: string;
    magasin__name: string;
    total_price: string;
    status: string;
    client__phone_number_1: string;
    created_at: string;
};

export default function Notification({ not, onsub }: { not: Notification[], onsub: (value: false) => void }) {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const search = useSearchParams();


    const command = search.get('id')
    console.log(command)
    useEffect(() => {
        if (isLoading) {
            onsub(false);
        }
    }, [search, isLoading, onsub])

    return (
        <div>
            <div className='bg-gray-100 rounded-lg overflow-auto max-h-[600px]'>
                {not.map((pre, index) => {
                    return (
                        <div key={index} className={`p-4 cursor-pointer rounded-lg hover:bg-gray-200 transition-colors ${isLoading && "hidden"}`}>
                            <Link onClick={() => Number(command) !== pre.id && setIsLoading(true)} href={`/dashboard/commandes?id=${pre.id}`} className={`flex items-center gap-4`}>
                                <div className="flex-shrink-0">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                        <RiLoader3Fill className='animate-spin mt-0.5' />
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">Nouvelle commande reçue</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Vous avez une nouvelle commande de {pre.client__username}.</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{getDateDifference(pre.created_at)} ago</p>
                                </div>
                            </Link>
                        </div>
                    )
                })
                }
                {not.length === 0 &&
                    <div className='p-4 cursor-pointer rounded-lg hover:bg-gray-200 transition-colors'>
                        <p className='text-md font-medium text-gray-700'>pas de commandes</p>
                    </div>
                }
            </div>
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}
