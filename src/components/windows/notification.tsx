import React from 'react'
import { RiLoader3Fill } from 'react-icons/ri'
import { getDateDifference } from '@/lib/tools/tools'
import Link from 'next/link';

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


    return (
        <div>
            <div className='bg-gray-100 rounded-lg overflow-auto h-[600px]'>
                {not.map((pre, index) => {
                    return (
                        <div key={index} onClick={() => onsub(false)} className="p-4 cursor-pointer rounded-lg hover:bg-gray-200 transition-colors">
                            <Link href={`/dashboard/commandes?id=${pre.id}`} className="flex items-center gap-4">
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
            </div>
        </div>
    )
}
