import React from 'react'
import Link from 'next/link'

export default function Action() {
  return (
    <div className='py-5 px-5 sm:px-16'>
        <div className='flex items-center gap-2 px-5 pb-5'>
            <Link href="/role" className='font-semibold text-xl'>Dashboard /</Link>
            <h1 className='font-bold text-xl'>Les actions</h1>
        </div>
        <div className='p-10 bg-white rounded-md shadow-md'>
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-primer">
            <tr>
                <th className="px-6 py-3">
                    <input type="checkbox" name='check' id="check" />
                </th>
                <th className="px-6 py-3">
                    Employé
                </th>
                <th className="px-6 py-3">
                    Client
                </th>
                <th className="px-6 py-3">
                    action
                </th>
                <th className="px-6 py-3">
                    id
                </th>
                <th className="px-6 py-3 text-right">
                    payé
                </th>
            </tr>
        </thead>
        <tbody className='odd:bg-six even:bg-fifth'>
            <tr className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    <input type="checkbox" name='check' id="check" />
                </td>
                <td className="px-6 py-4">
                    Abdelkader hlima
                </td>
                <td className="px-6 py-4">
                    Sidali
                </td>
                <td className="px-6 py-4">
                    Colie
                </td>
                <td className="px-6 py-4">
                    10290
                </td>
                <td className="px-6 py-4 text-right">
                    12000DA
                </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">
                    <input type="checkbox" name='check' id="check" />
                </td>
                <td className="px-6 py-4">
                    Abdelkader hlima
                </td>
                <td className="px-6 py-4">
                    Sidali
                </td>
                <td className="px-6 py-4">
                    Colie
                </td>
                <td className="px-6 py-4">
                    10290
                </td>
                <td className="px-6 py-4 text-right">
                    12000DA
                </td>
            </tr>
            <tr className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4">
                    <input type="checkbox" name='check' id="check" />
                </td>
                <td className="px-6 py-4">
                    Abdelkader hlima
                </td>
                <td className="px-6 py-4">
                    Sidali
                </td>
                <td className="px-6 py-4">
                    Colie
                </td>
                <td className="px-6 py-4">
                    10290
                </td>
                <td className="px-6 py-4 text-right">
                    12000DA
                </td>
            </tr>
            <tr className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4">
                    <input type="checkbox" name='check' id="check" />
                </td>
                <td className="px-6 py-4">
                    Abdelkader hlima
                </td>
                <td className="px-6 py-4">
                    Sidali
                </td>
                <td className="px-6 py-4">
                    Colie
                </td>
                <td className="px-6 py-4">
                    10290
                </td>
                <td className="px-6 py-4 text-right">
                    12000DA
                </td>
            </tr>
        </tbody>
    </table>
</div>

        </div>
    </div>
  )
}