"use client"

import { FormatDate } from '@/lib/tools/tools'
import Link from 'next/link'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Caisses({ promise }: { promise: Caisses[] }) {

    const casses = promise.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {index + 1}
                </td>
                <td className="px-6 py-4">
                    {FormatDate(pre.date_creationn)}
                </td>
                <td className="px-6 py-4">
                    {pre.resut}
                </td>
                <td className="px-6 py-4">
                    {pre.prix_reale}
                </td>
                <td className="px-6 py-4 text-right">

                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/role" className='font-semibold text-third'>Dashboard /</Link>
                <h1 className='font-bold'>Les caisses</h1>
            </div>
            <div className='p-10 pb-20 bg-white gap-10 rounded-md shadow-md'>
                <div className='mb-7 flex justify-between items-center'>
                    <form className='flex items-center gap-2'>
                        <FaSearch className='absolute text-slate-500' />
                        <input type="date" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherch</button>
                    </form>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    ID
                                </th>
                                <th className="px-6 py-3">
                                    Date de creation
                                </th>
                                <th className="px-6 py-3">
                                    Montent
                                </th>
                                <th className="px-6 py-3">
                                    Montant Réel
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Etat
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {casses}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
