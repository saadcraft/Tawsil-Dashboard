"use client"

import { FormatDate, handleInputChange } from '@/lib/tools/tools'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Aprove from '../windows/comp_win/aprove'
import { MdClose } from 'react-icons/md'
import { Wilaya } from '@/lib/tools/named'
import { getGroup } from '@/lib/gestion_action'

export default function Caisses({ promise }: { promise: Caisses[] }) {

    const [aprove, setAprove] = useState<Caisses | null>(null)
    const [group, setGroup] = useState<Groupes[] | null>(null)

    const handleGroup = async ({ wilaya }: { wilaya: string }) => {
        try {
            const data = await getGroup({ wilaya })
            if (data.data.length > 0) {
                setGroup(data.data)
            } else {
                setGroup(null)
            }
        } catch {
            setGroup(null)
        }
    }

    const router = useRouter()

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;
        const validation = formData.get('date') as string;
        const groupe = formData.get('group') as string
        const aprove = formData.get('valide') as string
        const wilaya = formData.get('wilaya') as string

        router.push(`?search=${cleint.replace(/^0+(?=\d)/, '')}&date=${validation}&chef=${groupe || ""}&approvie=${aprove}&wilaya=${wilaya}`);
    }

    const casses = promise.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-4 py-4">
                    {index + 1}
                </td>
                <td className="px-4 py-4">
                    {FormatDate(pre.date_creationn)}
                </td>
                <td className="px-4 py-4">
                    {pre.chef_bu.username}
                </td>
                <td className="px-4 py-4">
                    {pre.chef_bu.wilaya}
                </td>
                <td className="px-4 py-4">
                    {pre.a_compte}
                </td>
                <td className="px-4 py-4">
                    {pre.resut}
                </td>
                <td className="px-4 py-4">
                    {pre.prix_reale}
                </td>
                <td className="px-4 py-4 text-right">
                    {pre.approuve ?
                        <p className='text-green-600'>Approuvé</p>
                        :
                        pre.etat ? "En cours" : <button onClick={() => setAprove(pre)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'>Approuver</button>
                    }
                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold'>Les caisses</h1>
            </div>
            <div className='p-3 pb-20 bg-white md:p-10 md:pb-20 rounded-md shadow-md'>
                <div className='flex lg:flex-row flex-col items-center justify-between mb-7 gap-5'>
                    <form onSubmit={handleSearch} className='flex flex-wrap flex-col lg:flex-row justify-left items-center gap-5'>
                        <div className='relative'>
                            <FaSearch className='absolute top-3 text-slate-500' />
                            <input type="text" name="client" onChange={handleInputChange} placeholder='Search with Number' className='border-b outline-none py-2 pl-5 focus:border-slate-950' />
                        </div>
                        <input type="date" name="date" className='border-b outline-none py-2 pl-1 focus:border-slate-950' />
                        <div className='flex gap-2'>
                            <div>
                                <input type="radio" id="noValide" name="valide" defaultChecked value="False" className="peer hidden" />
                                <label htmlFor="noValide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> False</label>
                            </div>
                            <div>
                                <input type="radio" id="valide" name="valide" value="True" className="peer hidden" />
                                <label htmlFor="valide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> True</label>
                            </div>
                        </div>
                        <select name="wilaya" onChange={(e) => handleGroup({ wilaya: e.target.value })} className='border-b outline-none py-2 pl-1 focus:border-slate-950'>
                            <option value="">Sélection par Wilaya</option>
                            {Wilaya.map(pre => {
                                if (pre != null) {
                                    return (
                                        <option key={pre.id} value={pre.id}>{pre.code} - {pre.name}</option>
                                    )
                                }
                            })}
                        </select>
                        {group &&
                            <select name="group" className='border-b outline-none py-2 pl-7 focus:border-slate-950'>
                                <option value="">Sélection Groupe</option>
                                {group.map(pre => {
                                    if (pre != null) {
                                        return (
                                            <option key={pre.groupe} value={pre.groupe}>Groupe {pre.groupe} {pre.wilaya}</option>
                                        )
                                    }
                                })}
                            </select>
                        }
                        <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherch</button>
                    </form>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-4 py-3">
                                    ID
                                </th>
                                <th className="px-4 py-3">
                                    Date de creation
                                </th>
                                <th className="px-4 py-3">
                                    utilisateur
                                </th>
                                <th className="px-4 py-3">
                                    wilaya
                                </th>
                                <th className="px-6 py-3">
                                    Montent
                                </th>
                                <th className="px-4 py-3">
                                    Montant Réel
                                </th>
                                <th className="px-4 py-3">
                                    A compte
                                </th>
                                <th className="px-4 py-3 text-right">
                                    Etat
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {casses}
                        </tbody>
                    </table>
                </div>
            </div>
            {aprove &&
                <div>
                    <button onClick={() => setAprove(null)} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
                    <Aprove onClose={setAprove} casse={aprove} />
                </div>
            }
        </div>
    )
}
