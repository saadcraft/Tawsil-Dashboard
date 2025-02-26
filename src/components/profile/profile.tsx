"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import Image from 'next/image';
import PictureWin from '../windows/picture_win';
import { MdClose, MdOutlineEdit } from 'react-icons/md';
import ModifieForm from '../windows/chef_win/modifie_form';
import { userInformation } from '@/lib/tools/store/web_socket';
import { notFound } from 'next/navigation';

export default function Profile() {

    const [pic, setPic] = useState<number | null>(null)
    const [modify, setmodify] = useState<string | null>(null)
    const { user } = userInformation()

    if (!user) return notFound()

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='relative z-10 flex items-center gap-2 px-5 pb-5'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold text-xl'>Profile</h1>
            </div>
            <div className='relative top-20 md:top-10 pt-10 md:px-10 px-2 pb-10 max-w-5xl mx-auto bg-white rounded-md shadow-md'>
                <div className='absolute left-0 -top-20 flex justify-center w-full'>
                    <div className='relative rounded-full w-32 h-32 bg-slate-100 shadow-md'>
                        {user.image_url ? <Image width={100} height={100} src={`${process.env.IMGS_DOMAIN}${user.image_url}`} alt="profile photo" className='rounded-full w-full h-full object-cover' /> : <FaRegUser className='text-8xl p-4 w-32 h-32' />}
                        <span onClick={() => setPic(user.id)} className='absolute bottom-1 right-1 text-xl p-1 rounded-full bg-white shadow-md cursor-pointer hover:bg-slate-300' title='upload photo'><LuUpload /></span>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <p className='font-semibold ml-5 text-3xl p-3 text-center'>{user.last_name + " " + user.first_name}</p>
                    <MdOutlineEdit onClick={() => setmodify("nom")} className=' text-2xl text-gray-600 cursor-pointer hover:text-gray-950' title='Modifie Profile' />
                </div>
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
            {pic &&
                <>
                    <button onClick={() => setPic(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <PictureWin user={user.id} onsub={setPic} />
                </>
            }
            {modify &&
                <>
                    <button onClick={() => setmodify(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <ModifieForm user={user} onsub={setmodify} />
                </>
            }
        </div>
    )
}
