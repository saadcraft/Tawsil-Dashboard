"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Employer } from '@/lib/type_module/emploi_type';
import ModifieForm from '../windows/chef_win/modifie_form'
import { MdClose } from "react-icons/md";
import Disable from '../windows/chef_win/disable';
import { useRouter } from "next/navigation"

export default function ModAgent({ results }: { results: Employer[] }) {

    const router = useRouter()

    const [modify, setModify] = useState<Employer | null>(null)

    const [disabled, setDisabled] = useState<number>(0)

    const hundelModify = (info: Employer) => setModify(info);

    const hundelDisabled = (id: number) => setDisabled(id);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;

        router.push(`?search=${cleint}`);
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
                    {pre.bloquer ? "Blocked" :
                        <>
                            <button onClick={() => hundelModify(pre)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'><FaPen /></button>
                            <button onClick={() => hundelDisabled(pre.id)} className='ml-2 bg-red-700 text-white p-1 rounded-md hover:bg-red-500'><FaTrashAlt /></button>
                        </>
                    }
                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/role" className='font-semibold text-xl'>Dashboard /</Link>
                <h1 className='font-semibold text-xl'>Agent Administratif /</h1>
                <h1 className='font-bold text-xl'>Modifie Agent</h1>
            </div>
            <div className='p-10 pb-20 bg-white rounded-md shadow-md'>
                <form onSubmit={handleSearch} className='mb-7 flex items-center gap-2'>
                    <FaSearch className='absolute text-slate-500' />
                    <input type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                    <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Submit</button>
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
            {modify &&
                <div>
                    <button onClick={() => setModify(null)} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
                    <ModifieForm user={modify} onsub={setModify} />
                </div>
            }
            {disabled > 0 &&
                <div>
                    <button onClick={() => setDisabled(0)} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
                    <Disable onClose={setDisabled} user={disabled} />
                </div>
            }
        </div>
    )
}
