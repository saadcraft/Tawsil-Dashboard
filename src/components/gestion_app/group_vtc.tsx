"use client"

import { Wilaya } from '@/lib/tools/named'
import { userInformation } from '@/lib/tools/store/web_socket'
import { handleInputChange } from '@/lib/tools/tools'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { ValideCommande, ValideThird, ValideSecond } from '../windows/gestion_win/valide_total'
import { SubmitGroupeVTC } from '@/lib/comptable_action'
import { useSearchLoader } from '../options/useSearchLoader'
import LoadingFirst from '../loading'

type Props = {
    // user: Users
    promise: GroupeVTC[];
};

export default function GroupVtc({ promise }: Props) {

    const { isLoading, handleSearch } = useSearchLoader(['search', 'valide', 'wilaya']);

    const [isVisible, setIsVisible] = useState<number>(0);
    const [select, setSelect] = useState<GroupeVTC | null>(null)

    const router = useRouter()

    const { user } = userInformation()

    if (!user) return notFound()

    console.log(promise)

    const handleValidate = () => { setIsVisible(1) }
    const handleSecond = () => { setIsVisible(2) }
    const handleThird = () => { setIsVisible(3) }
    const handleClose = () => {
        setIsVisible(0)
        setSelect(null)

    }

    const handleFirstClick = (com: GroupeVTC) => {
        setSelect(com)
        setIsVisible(1)
    }

    const hundleSubmite = async (id: number) => {
        const result = await SubmitGroupeVTC({ id: id });
        if (result) {
            setIsVisible(0);
            setSelect(null);
            router.refresh();
            return true
        } else {
            return false
        }
    }

    const Commands = promise.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {pre.partener__id}
                </td>
                <td className="px-6 py-4">
                    {pre.partener__user__first_name} {pre.partener__user__first_name}
                </td>
                <td className="px-6 py-4">
                    {pre.partener__user__phone_number_1}
                </td>
                <td className="px-6 py-4">
                    {pre.partener__user__wilaya}
                </td>
                <td className="px-6 py-4">
                    {pre.paye ? "true" : "false"}
                </td>
                <td className="px-6 py-4 text-right">
                    {pre.paye ? <span className='text-green-600 font-semibold'>Payé</span> : <button onClick={() => handleFirstClick(pre)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'>Valider</button>}
                </td>
            </tr>
        )
    })

    // console.log(promise)

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold'>Validation</h1>
            </div>
            <div className='p-3 pb-20 md:pb-20 bg-white md:p-10 rounded-md shadow-md'>
                <form onSubmit={handleSearch} className='mb-7 flex flex-col lg:flex-row items-center gap-5'>
                    <div className='relative'>
                        <FaSearch className='absolute top-3 text-slate-500' />
                        <input onChange={handleInputChange} type="text" name="search" placeholder='Recherche par numéro' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                    </div>
                    <div className="inline-flex bg-gray-100 rounded-lg p-1">
                        <div className='relative'>
                            <input type="radio" id="valide" name="valide" defaultChecked value="True" className="peer hidden" />
                            <label
                                htmlFor="valide"
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-transparent rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:text-gray-900 peer-checked:bg-green-400 peer-checked:text-white peer-checked:shadow-sm"
                            >
                                Valider
                            </label>
                        </div>
                        <div className='relative'>
                            <input type="radio" id="noValide" name="valide" value="False" className="peer hidden" />
                            <label
                                htmlFor="noValide"
                                className="inline-flex items-center whitespace-nowrap justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-transparent rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:text-gray-900 peer-checked:bg-red-400 peer-checked:text-white peer-checked:shadow-sm"
                            >
                                No valider
                            </label>
                        </div>
                    </div>
                    <select name="wilaya" className='border-b outline-none py-2 pl-7 focus:border-slate-950'>
                        <option value="">Sélection Wilaya</option>
                        {Wilaya.map(pre => {
                            return (
                                <option key={pre.id} value={pre.name}>{pre.id} - {pre.name}</option>
                            )
                        })}
                    </select>
                    <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherche</button>
                </form>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    ID
                                </th>
                                <th className="px-6 py-3">
                                    Taxieur
                                </th>
                                <th className="px-6 py-3">
                                    Télephone
                                </th>
                                <th className="px-6 py-3">
                                    Wilaya
                                </th>
                                <th className="px-6 py-3">
                                    validation
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {Commands}
                        </tbody>
                    </table>
                </div>
            </div>
            {select ?
                isVisible === 1 ?
                    <div>
                        <button onClick={handleClose} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
                        <ValideCommande command={select} onEvent={handleSecond} onBack={handleClose} />
                    </div>
                    :
                    isVisible === 2 ?
                        <div>
                            <button onClick={handleClose} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
                            <ValideSecond command={select} onEvent={handleThird} onBack={handleValidate} />
                        </div>
                        :
                        isVisible === 3 &&
                        <div>
                            <button onClick={handleClose} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
                            <ValideThird command={select} onBack={handleSecond} onSub={hundleSubmite} user={user} />
                        </div>
                :
                ""
            }
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}
