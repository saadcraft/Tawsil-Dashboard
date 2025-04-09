"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { FaSearch } from "react-icons/fa";
import { FormatDate, handleInputChange } from "@/lib/tools/tools"
import { useRouter } from 'next/navigation'
import { Wilaya } from '@/lib/tools/named';
import { getGroup } from '@/lib/gestion_action';


export default function CompAction({ actions, total }: { actions: Actions[], total: number }) {

    const [group, setGroup] = useState<Groupes[] | null>(null)
    const router = useRouter()

    const handleGroup = async ({ wilaya }: { wilaya: string }) => {
        try {
            const data = await getGroup({ wilaya })
            if (data.data.length > 0) {
                setGroup(data.data)
            } else {
                setGroup(null)
            }
        } catch {
            setGroup(null)
        }
    }


    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;
        const date = formData.get('date') as string;
        const agent = formData.get('group') as string;

        router.push(`?search=${cleint.replace(/^0+(?=\d)/, '')}&groupe=${agent || ""}&date=${date}`);
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
                            <input type="text" name="client" onChange={handleInputChange} placeholder='recherche avec numéro' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        </div>
                        <input type="date" name="date" className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        <select name="wilaya" onChange={(e) => handleGroup({ wilaya: e.target.value })} className='border-b outline-none py-2 pl-1 focus:border-slate-950'>
                            <option value="">Sélection par Wilaya</option>
                            {Wilaya.map(pre => {
                                if (pre != null) {
                                    return (
                                        <option key={pre.id} value={pre.id}>{pre.code} - {pre.name}</option>
                                    )
                                }
                            })}
                        </select>
                        {group &&
                            <select name="group" className='border-b outline-none py-2 pl-7 focus:border-slate-950'>
                                <option value="">Sélection Groupe</option>
                                {group.map(pre => {
                                    if (pre != null) {
                                        return (
                                            <option key={pre.groupe} value={pre.groupe}>Groupe {pre.groupe} {pre.wilaya}</option>
                                        )
                                    }
                                })}
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