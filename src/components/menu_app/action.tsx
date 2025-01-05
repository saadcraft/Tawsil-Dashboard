"use client"

import React from 'react'
import Link from 'next/link'
import { FaSearch } from "react-icons/fa";

export default function Action({ actions }: { actions: Actions[]}) {

    const action = actions.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {pre.id}
                </td>
                <td className="px-6 py-4">
                    {pre.agent.last_name} {pre.agent.first_name}
                </td>
                <td className="px-6 py-4">
                    {pre.livreur.partenneur.user.first_name} {pre.livreur.partenneur.user.last_name}
                </td>
                <td className="px-6 py-4">
                    {pre.date_action}
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
            <div className='p-10 bg-white rounded-md shadow-md'>

                <div className='mb-7 flex items-center'>
                    <FaSearch className='absolute text-slate-500' />
                    <input type="text" name="search" placeholder='Search to table' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    id
                                </th>
                                <th className="px-6 py-3">
                                    agent
                                </th>
                                <th className="px-6 py-3">
                                    livreur
                                </th>
                                <th className="px-6 py-3">
                                    Date
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