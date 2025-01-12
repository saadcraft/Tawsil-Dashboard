"use client"

import React from 'react'
import Link from 'next/link'
import { FaSearch } from "react-icons/fa";
import { FormatDate } from "@/lib/tools/timer"
import { useRouter } from 'next/navigation'

export default function Action({ actions }: { actions: Actions[] }) {

    const router = useRouter()

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;

        router.push(`?search=${cleint}`);
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
                <Link href="/role" className='font-semibold text-xl'>Dashboard /</Link>
                <h1 className='font-bold text-xl'>Les actions</h1>
            </div>
            <div className='p-10 pb-20 bg-white rounded-md shadow-md'>
                <form onSubmit={handleSearch} className='mb-7 flex items-center gap-2'>
                    <FaSearch className='absolute text-slate-500' />
                    <input type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                    <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherch</button>
                </form>
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
        </div>
    )
}