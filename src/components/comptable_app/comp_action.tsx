"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { FaSearch } from "react-icons/fa";
import { FormatDate } from "@/lib/tools/tools"
import { useRouter } from 'next/navigation'
import { Wilaya } from '@/lib/tools/named';


export default function CompAction({ actions, groupe, total }: { actions: Actions[], groupe: Users[], total: number }) {

    const [city, setCity] = useState<number | null>(null)
    const router = useRouter()


    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;
        const date = formData.get('date') as string;
        const agent = formData.get('agent') as string;

        router.push(`?search=${cleint}&groupe=${agent}&date=${date}`);
    }

    const action = actions.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {pre.id}
                </td>
                <td className="px-6 py-4">
                    {FormatDate(pre.date_action)}
                </td>
                <td className="px-6 py-4">
                    {pre.agent.username}
                </td>
                <td className="px-6 py-4">
                    {pre.livreur.partenneur.user.first_name} {pre.livreur.partenneur.user.last_name}
                </td>
                <td className="px-6 py-4 text-right">
                    {pre.total_amount}
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
                <div className='flex xl:flex-row flex-col items-center justify-between mb-7 gap-5'>
                    <form onSubmit={handleSearch} className='flex flex-wrap flex-col lg:flex-row items-center gap-5'>
                        <div className='relative'>
                            <FaSearch className='absolute top-3 text-slate-500' />
                            <input type="text" name="client" placeholder='recherche avec numéro' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        </div>
                        <input type="date" name="date" className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        <select name="wilaya" onChange={(e) => setCity(Number(e.target.value) || null)} className='border-b outline-none py-2 pl-1 focus:border-slate-950'>
                            <option value="">Sélection par Wilaya</option>
                            {Wilaya.map(pre => {
                                if (pre != null) {
                                    return (
                                        <option key={pre.id} value={pre.id}>{pre.code} - {pre.name}</option>
                                    )
                                }
                            })}
                        </select>
                        {city &&
                            <select name="agent" className='border-b outline-none py-2 pl-1 focus:border-slate-950'>
                                <option value="">Sélectioné groupe</option>
                                {groupe.map((pre, index) => {
                                    if (city === pre.wilaya_code)
                                        return (
                                            <option key={index} value={pre.id}>Group {pre.wilaya} {pre.groupe}</option>
                                        )
                                })
                                }
                            </select>
                        }
                        <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherche</button>
                    </form>
                    <p className='text-xl hidden'>Total: <span className='font-bold'>{total.toFixed(2)} DA</span></p>
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
                                    agent
                                </th>
                                <th className="px-6 py-3">
                                    livreur
                                </th>
                                <th className="px-6 py-3 text-right">
                                    totale
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {action}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}