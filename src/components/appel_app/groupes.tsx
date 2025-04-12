"use client"

import { getGroup } from '@/lib/gestion_action'
import { Wilaya } from '@/lib/tools/named'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaPen, FaSearch } from 'react-icons/fa'
import UpdateGroupeName from '../windows/centre_win/update_groupe_name'
import toast from 'react-hot-toast'
import { UpdateUser } from '@/lib/call_action'
import { MdClose } from 'react-icons/md'
import { handleInputChange } from '@/lib/tools/tools'
import LoadingFirst from '../loading'
import { useSearchLoader } from '../options/useSearchLoader'

export default function Groupes({ groupe }: { groupe: Users[] }) {

    const { isLoading, handleSearch } = useSearchLoader(['search', 'wilaya', 'groupe']);

    const [group, setGroup] = useState<Groupes[] | null>(null)
    const [activePartnerId, setActivePartnerId] = useState<number | null>(null);
    const router = useRouter()


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

    const handleSubmit = async (id: number, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const groupeName = formData.get('groupe') as string;

        //check if some input is null
        if (groupeName === "") {
            toast.error('Aucun champ à mettre à jour.');
            return;
        }

        const updatedUser = { id: id.toString(), groupe_name: groupeName };

        const res = await UpdateUser(updatedUser)
        if (res) {
            router.refresh()
            setActivePartnerId(null)
        }
    }

    const data = groupe.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-4 py-4">
                    {index + 1}
                </td>
                <td className="px-6 py-4">
                    Groupe {pre.groupe}
                </td>
                <td className="px-6 py-4">
                    {pre.groupe_name || "/"}
                </td>
                <td className="px-6 py-4">
                    {pre.username}
                </td>
                <td className="px-6 py-4">
                    {pre.phone_number_1}
                </td>
                <td className="px-6 py-4 text-right">
                    <button onClick={() => setActivePartnerId(pre.id)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'><FaPen /></button>
                </td>
            </tr>
        )
    })
    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold'>Groupes</h1>
            </div>
            <div className='p-10 pb-20 bg-white rounded-md shadow-md'>
                <form onSubmit={handleSearch} className='mb-7 flex flex-col lg:flex-row items-center gap-5'>
                    <div className='relative'>
                        <FaSearch className='absolute top-3 text-slate-500' />
                        <input type="text" name="search" onChange={handleInputChange} placeholder='Recherche avec numéro' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                    </div>
                    <select onChange={(e) => handleGroup({ wilaya: e.target.value })} name="wilaya" className='border-b outline-none py-2 pl-7 focus:border-slate-950'>
                        <option value="">Sélection Wilaya</option>
                        {Wilaya.map(pre => {
                            return (
                                <option key={pre.id} value={pre.id}>{pre.id} - {pre.name}</option>
                            )
                        })}
                    </select>
                    {group &&
                        <select name="groupe" className='border-b outline-none py-2 pl-7 focus:border-slate-950'>
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
                    <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherche</button>
                </form>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    ID
                                </th>
                                <th className="px-6 py-3">
                                    Groupe
                                </th>
                                <th className="px-6 py-3">
                                    Nom de Groupe
                                </th>
                                <th className="px-6 py-3">
                                    username
                                </th>
                                <th className="px-6 py-3">
                                    Numéro
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {data}
                        </tbody>
                    </table>
                </div>
            </div>
            {activePartnerId &&
                <div>
                    <button onClick={() => setActivePartnerId(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <UpdateGroupeName id={activePartnerId} onEvent={handleSubmit} onClose={setActivePartnerId} />
                </div>
            }
            {/* {disabled > 0 &&
                <div>
                    <button onClick={() => setDisabled(0)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <Disable onClose={setDisabled} user={disabled} />
                </div>
            } */}
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}
