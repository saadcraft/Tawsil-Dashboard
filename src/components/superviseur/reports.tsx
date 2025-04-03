"use client"

import { FormatDate } from '@/lib/tools/tools'
import Link from 'next/link'
import React, { useState } from 'react'
import { Report } from '@/lib/type_module/center_type'
import DisplayReport from '../windows/super_win/show_report'
import { MdClose } from 'react-icons/md'

export default function Reports({ reports }: { reports: Report[] }) {

    // console.log(reports)

    const [activePartnerId, setActivePartnerId] = useState<string | null>(null);

    const report = reports.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {pre.id}
                </td>
                <td className="px-6 py-4">
                    {FormatDate(pre.date)}
                </td>
                <td className="px-6 py-4">
                    {pre.parteneur.user.first_name} {pre.parteneur.user.last_name}
                </td>
                <td className="px-6 py-4">
                    {pre.parteneur.user.phone_number_1}
                </td>
                <td className="px-6 py-4 text-right">
                    <span onClick={() => setActivePartnerId(pre.message)} className='hover:border-black border-b-2 hover:font-bold cursor-pointer'>afficher</span>
                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold'>Validation</h1>
            </div>
            <div className='p-3 pb-20 md:pb-20 bg-white md:p-10 rounded-md shadow-md'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    ID
                                </th>
                                <th className="px-6 py-3">
                                    Date
                                </th>
                                <th className="px-6 py-3">
                                    Parteneur
                                </th>
                                <th className="px-6 py-3">
                                    Télephone
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Raport
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {report}
                        </tbody>
                    </table>
                </div>
            </div>
            {activePartnerId &&
                <>
                    <button onClick={() => setActivePartnerId(null)} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
                    <DisplayReport message={activePartnerId} />
                </>
            }
        </div>
    )
}
