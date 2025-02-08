import Link from 'next/link'
import React from 'react'
import { FaRegUser } from "react-icons/fa";

export default function Profile({ user }: { user: Users }) {
    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold text-xl'>Profile</h1>
            </div>
            <div className='relative top-10 p-10 pb-20 max-w-5xl mx-auto bg-white rounded-md shadow-md'>
                <div className='absolute left-0 -top-20 flex justify-center w-full'>
                    <div className='rounded-full p-4 bg-slate-100 shadow-md'>
                        <FaRegUser className='text-8xl' />
                    </div>
                </div>
                <p className='font-semibold text-3xl p-3 text-center'>{user.last_name + " " + user.first_name}</p>
                <div className="flex justify-center items-center h-5/6 gap-10 rounded-lg">
                    <div className="font-semibold text-lg space-y-4 text-gray-700">
                        <p>email :</p>
                        <p>Télephone :</p>
                        <p>Role:</p>
                        <p>La date de naissaance :</p>
                        <p>Wilaya :</p>
                        <p>Lieux :</p>
                    </div>
                    <div className="text-lg border-l pl-4 space-y-4 text-gray-600">
                        <p>{user.email}</p>
                        <p>{user.phone_number_1}</p>
                        <p>{user.role}</p>
                        <p>{user.date_de_naissance || "/"}</p>
                        <p>{user.wilaya}</p>
                        <p>{user.lieux || "/"}</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
