"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import AddMagasin from '../windows/gestion_win/add_magasin';

export default function Magasin({ allMagasin }: { allMagasin: MagasinType[] }) {

    const [addMagasin, setAddMagasin] = useState<boolean>(false);

    console.log(allMagasin)

    const typeMagasin = allMagasin.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {pre.id}
                </td>
                <td className="px-6 py-4">
                    {pre.name}
                </td>
                <td className="px-6 py-4">
                    {pre.description}
                </td>
                <td className="px-6 py-4 text-right">
                    {pre.tax_tawsile}
                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/role" className='font-semibold text-xl'>Dashboard /</Link>
                <h1 className='font-bold text-xl'>Magasin</h1>
            </div>
            <div className='p-10 pb-20 bg-white rounded-md shadow-md'>
                <div className='flex justify-between'>
                    <form className='mb-7 flex items-center gap-2'>
                        <FaSearch className='absolute text-slate-500' />
                        <input type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Submit</button>
                    </form>
                    <div>
                        <button onClick={() => setAddMagasin(true)} className='bg-green-600 hover:bg-green-500 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Add Magasin</button>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    id
                                </th>
                                <th className="px-6 py-3">
                                    Nom
                                </th>
                                <th className="px-6 py-3">
                                    Discription
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Tax
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {typeMagasin}
                        </tbody>
                    </table>
                </div>
            </div>
            {addMagasin &&
                <div>
                    <button onClick={() => setAddMagasin(false)} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
                    <AddMagasin onSub={setAddMagasin} />
                </div>
            }
        </div>
    )
}
