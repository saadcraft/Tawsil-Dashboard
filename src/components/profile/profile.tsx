"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { LuUpload } from "react-icons/lu";
import Image from 'next/image';
import PictureWin from '../windows/picture_win';
import { MdClose, MdOutlineEdit } from 'react-icons/md';
import ModifieForm from '../windows/chef_win/modifie_form';
import { userInformation } from '@/lib/tools/store/web_socket';
import { notFound } from 'next/navigation';
import Named from '@/lib/tools/named';

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
            <div className='relative flex flex-col gap-3 pt-10 md:px-10 px-2 pb-10 max-w-6xl mx-auto bg-white rounded-md shadow-md'>
                <div className="p-5 border border-gray-200 rounded-2xl lg:p-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full">
                                <Image
                                    width={80}
                                    height={80}
                                    src={user.image_url ? `${process.env.IMGS_DOMAIN}${user.image_url}` : "/placeholder.svg"}
                                    alt="user"
                                    className='object-cover h-full'
                                />
                            </div>
                            <div className="order-3 xl:order-2">
                                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 xl:text-left">
                                    {user.last_name} {user.first_name}
                                </h4>
                                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {Named(user.role)}
                                    </p>
                                    <div className="hidden h-3.5 w-px bg-gray-300 xl:block"></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {user.wilaya || "/"}, Algerie
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setPic(user.id)}
                            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto"
                        >
                            <LuUpload />

                            Modifier
                        </button>
                    </div>
                </div>
                <div className="p-5 border border-gray-200 rounded-2xl lg:p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                                Informations personnelles
                            </h4>

                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                                <div>
                                    <p className="mb-2 text-xs leading-normal text-gray-500">
                                        Email address
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {user.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-2 text-xs leading-normal text-gray-500">
                                        Télephone
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {user.phone_number_1}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-2 text-xs leading-normal text-gray-500">
                                        La date de naissaance
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {user.date_de_naissance || "/"}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-2 text-xs leading-normal text-gray-500">
                                        Lieux
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {user.lieux || "/"}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-2 text-xs leading-normal text-gray-500">
                                        Wilaya
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {user.wilaya}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-2 text-xs leading-normal text-gray-500">
                                        Role
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {Named(user.role)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setmodify("nom")}
                            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto"
                        >

                            <MdOutlineEdit className=' text-xl' />
                            Modifier
                        </button>
                    </div>
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
