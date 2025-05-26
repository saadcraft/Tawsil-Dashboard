"use client"

import { Wilaya } from '@/lib/tools/named'
import { handleInputChange } from '@/lib/tools/tools'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegCheckCircle, FaSearch } from 'react-icons/fa'
import ActiveCompte from '../windows/chef_win/active-compte'
import { MdClose, MdOutlineDisabledByDefault } from 'react-icons/md'
import { getGroup } from '@/lib/gestion_action'
import { useSearchLoader } from '../options/useSearchLoader'
import LoadingFirst from '../loading'
import { useRouter } from 'next/navigation'

export default function Parteneure({ users }: { users: Partenaire[] }) {

    const { isLoading, handleSearch } = useSearchLoader(['search', 'wilaya', 'is_active', 'groupe']);

    const [user, setUser] = useState<{ id: number, statue: boolean } | null>(null)
    const [group, setGroup] = useState<Groupes[] | null>(null)

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

    const parteneur = users.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {pre.id}
                </td>
                <td className="px-6 py-4 text-nowrap">
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
                    {pre.type_compte?.name}
                </td>
                <td className="px-6 py-4 flex gap-3">
                    {pre.user.is_active ?
                        <button onClick={() => setUser({ id: pre.user.id, statue: pre.user.is_active })} className='bg-red-700 text-white p-1 rounded-md hover:bg-red-500 flex items-center'>Désactivé <MdOutlineDisabledByDefault /></button> :
                        <button onClick={() => setUser({ id: pre.user.id, statue: pre.user.is_active })} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500 flex items-center'>Activé <FaRegCheckCircle /></button>
                    }
                    {/* <button onClick={() => hundelModify(pre)} className='bg-green-700 text-white py-1 px-2 rounded-md hover:bg-green-500'><FaPen /></button> */}
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
                <form onSubmit={handleSearch} className='mb-7 flex flex-col lg:flex-row items-center gap-5'>
                    <div className='relative'>
                        <FaSearch className='absolute top-3 text-slate-500' />
                        <input onChange={handleInputChange} type="text" name="search" placeholder='Recherche par numéro' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                    </div>
                    <div className='flex gap-2'>
                        <div>
                            <input type="radio" id="noValide" name="is_active" defaultChecked value="false" className="peer hidden" />
                            <label htmlFor="noValide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> Désactivé</label>
                        </div>
                        <div>
                            <input type="radio" id="valide" name="is_active" value="true" className="peer hidden" />
                            <label htmlFor="valide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> Activé</label>
                        </div>
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
                    <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherche</button>
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
                                <th className="px-6 py-3">
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
            {user &&
                <div>
                    <button onClick={() => setUser(null)} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
                    <ActiveCompte onClose={setUser} user={user} refresh={router.refresh} />
                </div>
            }
            {/* {modify &&
                <div>
                    <button onClick={() => setModify(null)} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
                    <ModifyUser user={modify} magasine={maga} onsub={setModify} />
                </div>
            } */}
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}
