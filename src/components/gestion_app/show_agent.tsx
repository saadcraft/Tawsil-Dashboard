"use client"

import { getGroup } from '@/lib/gestion_action'
import { Wilaya } from '@/lib/tools/named'
import { handleInputChange } from '@/lib/tools/tools'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from "next/navigation"

export default function ShowAgent({ results }: { results: Users[] }) {

    const router = useRouter()

    const [group, setGroup] = useState<number[] | null>(null)

    console.log(group)

    const handleGroup = async ({ wilaya }: { wilaya: string }) => {
        try {
            if (wilaya != "") {
                const data = await getGroup({ wilaya })
                if (data.data.length > 0) {
                    setGroup(data.data)
                } else {
                    setGroup(null)
                }
            }
        } catch {
            setGroup(null)
        }
    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;
        const wilaya = formData.get('wilaya') as string;
        const groupe = formData.get('group') as string || "";

        router.push(`?search=${cleint}&wilaya=${wilaya}&groupe=${groupe}`);
    }

    const result = results.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {index + 1}
                </td>
                <td className="px-6 py-4">
                    {pre.username}
                </td>
                <td className="px-6 py-4">
                    {pre.first_name} {pre.last_name}
                </td>
                <td className="px-6 py-4">
                    {pre.phone_number_1}
                </td>
                <td className="px-6 py-4">
                    {pre.email}
                </td>
                <td className="px-6 py-4 text-right">

                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-semibold text-xl'>Agent Administratif /</h1>
                <h1 className='font-bold text-xl'>Modifie Agent</h1>
            </div>
            <div className='p-10 pb-20 bg-white rounded-md shadow-md'>
                <form onSubmit={handleSearch} className='mb-7 flex items-center gap-2'>
                    <div className='relative'>
                        <FaSearch className='absolute top-3 text-slate-500' />
                        <input onChange={handleInputChange} type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                    </div>
                    <select onChange={(e) => handleGroup({ wilaya: e.target.value })} name="wilaya" className='border-b outline-none py-2 pl-7 focus:border-slate-950'>
                        <option value="">Sélection Wilaya</option>
                        {Wilaya.map(pre => {
                            return (
                                <option key={pre.id} value={pre.name}>{pre.id} - {pre.name}</option>
                            )
                        })}
                    </select>
                    {group &&
                        <select name="group" className='border-b outline-none py-2 pl-7 focus:border-slate-950'>
                            <option value="">Sélection Groupe</option>
                            {group.map(pre => {
                                if (pre != null) {
                                    return (
                                        <option key={pre} value={pre}>Groupe {pre}</option>
                                    )
                                }
                            })}
                        </select>
                    }
                    <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherch</button>
                </form>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    ID
                                </th>
                                <th className="px-6 py-3">
                                    UserName
                                </th>
                                <th className="px-6 py-3">
                                    Employé
                                </th>
                                <th className="px-6 py-3">
                                    Numéro
                                </th>
                                <th className="px-6 py-3">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Modifie
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {result}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
