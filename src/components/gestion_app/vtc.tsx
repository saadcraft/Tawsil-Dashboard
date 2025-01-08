import Link from 'next/link'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Vtc() {
    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/role" className='font-semibold text-xl'>Dashboard /</Link>
                <h1 className='font-bold text-xl'>VTC</h1>
            </div>
            <div className='p-10 pb-20 bg-white rounded-md shadow-md'>
                <form className='mb-7 flex items-center gap-2'>
                    <FaSearch className='absolute text-slate-500' />
                    <input type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                    <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Submit</button>
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
                                    Taxieur
                                </th>
                                <th className="px-6 py-3 text-right">
                                    totale
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
