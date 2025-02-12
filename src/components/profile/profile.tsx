import Link from 'next/link'
import React from 'react'
import { FaRegUser } from "react-icons/fa";
import Image from 'next/image';

export default function Profile({ user }: { user: Users }) {

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold text-xl'>Profile</h1>
            </div>
            <div className='relative top-20 md:top-10 pt-10 md:px-10 px-2 pb-10 max-w-5xl mx-auto bg-white rounded-md shadow-md'>
                <div className='absolute left-0 -top-20 flex justify-center w-full'>
                    <div className='rounded-full bg-slate-100 shadow-md'>
                        {user.image_url ? <Image width={100} height={100} src={`${process.env.SERVER_DOMAIN}${user.image_url}`} alt="profile photo" className='rounded-full w-32' /> : <FaRegUser className='text-8xl p-4 w-32 h-32' />}
                    </div>
                </div>
                <p className='font-semibold text-3xl p-3 text-center'>{user.last_name + " " + user.first_name}</p>
                <div className="h-5/6 rounded-lg flex justify-center text-xs md:text-lg">
                    <table>
                        <tbody className='text-left'>
                            <tr className='border-b'>
                                <th className='p-2'>email : </th>
                                <td className='text-nowrap'>{user.email}</td>
                            </tr>
                            <tr className='border-b p-2'>
                                <th className='p-2'>Télephone : </th>
                                <td>{user.phone_number_1}</td>
                            </tr>
                            <tr className='border-b'>
                                <th className='p-2'>Role: </th>
                                <td>{user.role}</td>
                            </tr>
                            <tr className='border-b'>
                                <th className='p-2'>La date de naissaance: </th>
                                <td>{user.date_de_naissance || "/"}</td>
                            </tr>
                            <tr className='border-b'>
                                <th className='p-2'>Wilaya : </th>
                                <td>{user.wilaya}</td>
                            </tr>
                            <tr className='border-b'>
                                <th className='p-2'>Lieux : </th>
                                <td>{user.lieux || "/"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
