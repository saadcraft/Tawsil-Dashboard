"use client"

import { FormatDate, handleInputChange } from '@/lib/tools/tools';
import Link from 'next/link';
import React from 'react'
import { FaSearch } from 'react-icons/fa';
import LoadingFirst from '../loading';
import { useSearchLoader } from '../options/useSearchLoader';

export default function ActionsCenter({ actions }: { actions: centerAction[] }) {

    const { isLoading, handleSearch } = useSearchLoader(['search', 'date']);

    // console.log(actions)

    const action = actions.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {pre.id}
                </td>
                <td className="px-6 py-4">
                    {FormatDate(pre.data_de_creation)}
                </td>
                <td className="px-6 py-4">
                    {pre.centre_appel.username}
                </td>
                <td className="px-6 py-4">
                    {pre.superviseur?.username}
                </td>
                <td className="px-6 py-4">
                    {pre.prix?.toFixed(2)} DA
                </td>
                <td className="px-6 py-4 text-right">
                    {pre.prix_a_envoye?.toFixed(2)} DA
                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold text-xl'>Les actions</h1>
            </div>
            <div className='p-10 pb-20 bg-white rounded-md shadow-md'>
                <div className='flex lg:flex-row flex-col items-center justify-between mb-7 gap-5'>
                    <form onSubmit={handleSearch} className='flex flex-col lg:flex-row items-center gap-5'>
                        <div className='relative'>
                            <FaSearch className='absolute top-3 text-slate-500' />
                            <input type="text" name="search" onChange={handleInputChange} placeholder='recherche avec numéro' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        </div>
                        <input type="date" name="date" className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherche</button>
                    </form>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    id
                                </th>
                                <th className="px-6 py-3">
                                    Date
                                </th>
                                <th className="px-6 py-3">
                                    Utilisateur
                                </th>
                                <th className="px-6 py-3">
                                    Demandeur
                                </th>
                                <th className="px-6 py-3">
                                    Prix Demandé
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Prix Envoyer
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {action}
                        </tbody>
                    </table>
                </div>
            </div>
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}
