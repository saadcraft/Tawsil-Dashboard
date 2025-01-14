"use client"

import Link from 'next/link'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { handleInputChange } from "@/lib/tools/tools"
import { Wilaya } from '@/lib/tools/named'
import { useRouter } from "next/navigation"

export default function Validation({ users }: { users: Partenaire[] }) {

    const router = useRouter();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;
        const wilaya = formData.get('wilaya') as string;
        const validation = formData.get('valide') as string;

        router.push(`?search=${cleint}&wilaya=${wilaya}&is_active=${validation}`);
    }

    const parteneur = users.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {pre.id}
                </td>
                <td className="px-6 py-4">
                    Group {pre.user.groupe}
                </td>
                <td className="px-6 py-4">
                    {pre.user.first_name} {pre.user.last_name}
                </td>
                <td className="px-6 py-4">
                    {pre.user.email}
                </td>
                <td className="px-6 py-4">
                    {pre.user.phone_number_1}
                </td>
                <td className="px-6 py-4">
                    {pre.type_compte.name}
                </td>
                <td className="px-6 py-4 text-right">

                </td>
            </tr>
        )
    })
    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/role" className='font-semibold text-third'>Dashboard /</Link>
                <h1 className='font-bold'>Validation</h1>
            </div>
            <div className='p-10 pb-20 bg-white rounded-md shadow-md'>
                <form onSubmit={handleSearch} className='mb-7 flex items-center gap-2'>
                    <FaSearch className='absolute text-slate-500' />
                    <input onChange={handleInputChange} type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                    <div className='flex gap-2'>
                        <div>
                            <input type="radio" id="noValide" name="valide" defaultChecked value="false" className="peer hidden" />
                            <label htmlFor="noValide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> No valider</label>
                        </div>
                        <div>
                            <input type="radio" id="valide" name="valide" value="true" className="peer hidden" />
                            <label htmlFor="valide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> valider</label>
                        </div>
                    </div>
                    <select name="wilaya" className='border-b outline-none py-2 pl-7 focus:border-slate-950'>
                        <option value="">Sélection Wilaya</option>
                        {Wilaya.map(pre => {
                            return (
                                <option key={pre.id} value={pre.name}>{pre.id} - {pre.name}</option>
                            )
                        })}
                    </select>
                    <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherch</button>
                </form>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    ID
                                </th>
                                <th className="px-6 py-3">
                                    Group
                                </th>
                                <th className="px-6 py-3">
                                    Nom et Prénom
                                </th>
                                <th className="px-6 py-3">
                                    Email
                                </th>
                                <th className="px-6 py-3">
                                    Télephone
                                </th>
                                <th className="px-6 py-3">
                                    Type de compte
                                </th>
                                <th className="px-6 py-3 text-right">
                                    validation
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {parteneur}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
