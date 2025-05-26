"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import AddMagasin from '../windows/gestion_win/add_magasin';
import ModifyMagasinWin from '../windows/gestion_win/modify_magasin'

export default function Magasin({ allMagasin }: { allMagasin: MagasinType[] }) {

    const [addMagasin, setAddMagasin] = useState<boolean>(false);
    const [modify, setModify] = useState<MagasinType | null>(null);

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
                <td className="px-6 py-4 text-right">
                    <button onClick={() => setModify(pre)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'><FaPen /></button>
                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold text-xl'>Magasin</h1>
            </div>
            <div className='p-3 pb-20 bg-white md:p-10 rounded-md shadow-md'>
                <div className='flex lg:flex-row flex-col items-center justify-between mb-7 gap-5'>
                    {/* <form className='flex flex-col lg:flex-row items-center gap-5'>
                        <div className='relative'>
                            <FaSearch className='absolute top-3 text-slate-500' />
                            <input type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        </div>
                        <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Submit</button>
                    </form> */}
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
                                <th className="px-6 py-3 text-right">
                                    Modifie
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
                    <button onClick={() => setAddMagasin(false)} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
                    <AddMagasin onSub={setAddMagasin} />
                </div>
            }
            {modify &&
                <div>
                    <button onClick={() => setModify(null)} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
                    <ModifyMagasinWin magasin={modify} onSub={setModify} />
                </div>
            }
        </div>
    )
}
