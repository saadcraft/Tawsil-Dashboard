import Link from 'next/link'
import React from 'react'

export default function Recharge() {
    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/role" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold'>Recharge</h1>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}