"use client"

import { FormatDate } from '@/lib/tools/tools'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Aprove from '../windows/comp_win/aprove'
import { MdClose } from 'react-icons/md'

export default function Caisses({ promise, chefs }: { promise: Caisses[], chefs: Users[] }) {

    const [aprove, setAprove] = useState<Caisses | null>(null)

    const router = useRouter()

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;
        const validation = formData.get('date') as string;
        const groupe = formData.get('group') as string
        const aprove = formData.get('valide') as string

        router.push(`?search=${cleint}&date=${validation}&chef=${groupe}&approvie=${aprove}`);
    }

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
                    {pre.approuve ?
                        <p className='text-green-600'>Approuvé</p>
                        :
                        pre.etat ? "En cours" : <button onClick={() => setAprove(pre)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'>Approuver</button>
                    }
                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold'>Les caisses</h1>
            </div>
            <div className='p-10 pb-20 bg-white gap-10 rounded-md shadow-md'>
                <div className='mb-7 flex justify-between items-center'>
                    <form onSubmit={handleSearch} className='flex items-center gap-2'>
                        <FaSearch className='absolute text-slate-500' />
                        <input type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        <input type="date" name="date" className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        <div className='flex gap-2'>
                            <div>
                                <input type="radio" id="noValide" name="valide" defaultChecked value="False" className="peer hidden" />
                                <label htmlFor="noValide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> False</label>
                            </div>
                            <div>
                                <input type="radio" id="valide" name="valide" value="True" className="peer hidden" />
                                <label htmlFor="valide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> True</label>
                            </div>
                        </div>
                        <select name="group" className='border-b outline-none py-2 focus:border-slate-950'>
                            <option value="">Sélectioné groupe</option>
                            {chefs.map((pre, index) => {
                                return (
                                    <option key={index} value={pre.id}>Group {pre.wilaya} {pre.groupe}</option>
                                )
                            })
                            }
                        </select>
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
            {aprove &&
                <div>
                    <button onClick={() => setAprove(null)} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
                    <Aprove onClose={setAprove} casse={aprove} />
                </div>
            }
        </div>
    )
}
