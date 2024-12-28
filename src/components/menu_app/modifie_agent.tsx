import React from 'react'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { FaPen, FaTrashAlt } from "react-icons/fa";

export default function ModAgent() {
  return (
    <div className='py-5 px-5 sm:px-16'>
      <div className='flex items-center gap-2 px-5 pb-5'>
            <Link href="/role" className='font-semibold text-xl'>Dashboard /</Link>
            <h1 className='font-semibold text-xl'>Agent Administratif /</h1>
            <h1 className='font-bold text-xl'>Modifie Agent</h1>
        </div>
        <div className='p-10 bg-white rounded-md shadow-md'>
                
                <div className='mb-7 flex items-center'>
                    <FaSearch className='absolute text-slate-500'/>
                    <input type="text" name="search" placeholder='Search to table' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    ID
                                </th>
                                <th className="px-6 py-3">
                                    Employé
                                </th>
                                <th className="px-6 py-3">
                                    action
                                </th>
                                <th className="px-6 py-3">
                                    id
                                </th>
                                <th className="px-6 py-3">
                                    payé
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Modifie
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            <tr className="bg-white border-b text-black hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    Abdelkader hlima
                                </td>
                                <td className="px-6 py-4">
                                    Colie
                                </td>
                                <td className="px-6 py-4">
                                    10290
                                </td>
                                <td className="px-6 py-4">
                                    12000DA
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'><FaPen /></button>
                                    <button className='ml-1 bg-red-700 text-white p-1 rounded-md hover:bg-red-500'><FaTrashAlt /></button>
                                </td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                                    2
                                </td>
                                <td className="px-6 py-4">
                                    Abdelkader hlima
                                </td>
                                <td className="px-6 py-4">
                                    Colie
                                </td>
                                <td className="px-6 py-4">
                                    10290
                                </td>
                                <td className="px-6 py-4">
                                    12000DA
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'><FaPen /></button>
                                    <button className='ml-1 bg-red-700 text-white p-1 rounded-md hover:bg-red-500'><FaTrashAlt /></button>
                                </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    3
                                </td>
                                <td className="px-6 py-4">
                                    Abdelkader hlima
                                </td>
                                <td className="px-6 py-4">
                                    Colie
                                </td>
                                <td className="px-6 py-4">
                                    10290
                                </td>
                                <td className="px-6 py-4">
                                    12000DA
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'><FaPen /></button>
                                    <button className='ml-1 bg-red-700 text-white p-1 rounded-md hover:bg-red-500'><FaTrashAlt /></button>
                                </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    4
                                </td>
                                <td className="px-6 py-4">
                                    Abdelkader hlima
                                </td>
                                <td className="px-6 py-4">
                                    Colie
                                </td>
                                <td className="px-6 py-4">
                                    10290
                                </td>
                                <td className="px-6 py-4">
                                    12000DA
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'><FaPen /></button>
                                    <button className='ml-1 bg-red-700 text-white p-1 rounded-md hover:bg-red-500'><FaTrashAlt /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        
                </div>
    </div>
  )
}
