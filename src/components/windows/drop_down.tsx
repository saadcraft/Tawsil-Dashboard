import { SignOut } from '@/lib/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import LoadingFirst from '../loading';


export default function DropDown({ onClose }: { onClose: (value: false) => void }) {


    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const search = usePathname()

    useEffect(() => {
        if (isLoading) {
            onClose(false);
        }
    }, [search, isLoading, onClose])

    const handleSubmit = async () => {

        const loadingToastId = toast.loading('Déconnection...');
        try {
            const result = await SignOut();

            if (result) {
                toast.success('Déconnecter avec succès', { id: loadingToastId });
                setIsLoading(true)
                router.push('/');
            } else {
                toast.error('Probleme avec Déconnection', { id: loadingToastId });
                // onClose(false)
            }

        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { id: loadingToastId });
            } else {
                toast.error('An unknown error occurred', { id: loadingToastId });
            }
        }

    };

    return (
        <div>
            <div className='bg-gray-100 rounded-lg'>
                <ul onClick={() => onClose(false)} className="flex flex-col gap-1 pt-4 pb-3 border-gray-200">
                    <li className='border-b'>
                        <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700"
                        >
                            <FaRegUserCircle className='fill-gray-500 group-hover:fill-gray-700' />
                            Compte
                        </Link>
                    </li>
                    <li>
                        <div
                            onClick={handleSubmit}
                            className="flex items-center gap-3 cursor-pointer px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700"
                        >
                            <CiLogout className='fill-gray-500 group-hover:fill-gray-700' />
                            Déconnecter
                        </div>
                    </li>
                </ul>
            </div>
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}
