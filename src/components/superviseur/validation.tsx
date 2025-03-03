"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegCheckCircle, FaSearch } from 'react-icons/fa'
import { handleInputChange } from "@/lib/tools/tools"
import { Wilaya } from '@/lib/tools/named'
import { useRouter } from "next/navigation"
import { MdClose, MdGpsFixed, MdOutlineDisabledByDefault, MdOutlineReport } from 'react-icons/md'
import ActiveCompte from '../windows/chef_win/active-compte'
import toast from 'react-hot-toast'
import { AddReport } from '@/lib/super_action'
import SuperReport from '../windows/super_win/super_report'
import Display from '../windows/gestion_win/display'
import ModifieGeo from '../windows/super_win/modifie_goe'

export default function Validation({ users }: { users: Partenaire[] }) {

    const [user, setUser] = useState<{ id: number, statue: boolean } | null>(null);
    const [activePartnerId, setActivePartnerId] = useState<number | null>(null);
    const [show, setShow] = useState<Partenaire | null>(null);
    const [geo, setGeo] = useState<number | null>(null)

    const router = useRouter();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;
        const wilaya = formData.get('wilaya') as string;
        const validation = formData.get('valide') as string;

        router.push(`?search=${cleint}&wilaya=${wilaya}&is_active=${validation}`);
    }

    const handleSubmite = async (id: number, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const add = formData.get('message') as string;

        if (!add || add.trim() === '') {
            toast.error('Veuillez entrer un message.'); // Show an error message
            return; // Stop further execution
        }

        const res = await AddReport({ id: id, message: add })
        if (res) {
            setActivePartnerId(null)
        }
    }

    const parteneur = users.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50 text-nowrap">
                <td className="px-4 py-4">
                    {pre.id}
                </td>
                <td className="px-4 py-4">
                    Group {pre.user.groupe}
                </td>
                <td className="px-4 py-4">
                    {pre.user.first_name} {pre.user.last_name}
                </td>
                <td className="px-4 py-4">
                    {pre.user.email}
                </td>
                <td className="px-4 py-4">
                    {pre.user.phone_number_1}
                </td>
                <td className="px-4 py-4">
                    {pre.type_compte?.name}
                </td>
                <td className="px-4 py-4 flex mt-1 gap-2 justify-center">
                    {pre.user.is_active ?
                        <button onClick={() => setUser({ id: pre.user.id, statue: pre.user.is_active })} className='bg-red-700 text-white p-1 rounded-md hover:bg-red-500 flex items-center'>Désactivé <MdOutlineDisabledByDefault /></button> :
                        <button onClick={() => setUser({ id: pre.user.id, statue: pre.user.is_active })} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500 flex items-center'>Activé <FaRegCheckCircle /></button>
                    }
                    <button onClick={() => setActivePartnerId(pre.id)} className='bg-red-700 text-white p-1 px-2 rounded-md hover:bg-red-500 inline-flex items-center'><MdOutlineReport /></button>
                </td>
                <td className="px-4 py-4 text-right">
                    <div className='flex gap-1 justify-end'>
                        {pre.type_compte.name === "magasin" &&
                            <button onClick={() => setGeo(pre.id)} className='p-1 px-2 rounded-md border-blue-800 border hover:text-white hover:bg-blue-800 inline-flex items-center text-nowrap'><MdGpsFixed /></button>
                        }
                        <button onClick={() => setShow(pre)} className='p-1 rounded-md border-blue-800 border hover:text-white hover:bg-blue-800 inline-flex items-center text-nowrap'>Détails</button>
                    </div>
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
                        <input onChange={handleInputChange} type="text" name="client" placeholder='Recherche par numéro' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                    </div>
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
                                    Groupe
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
                                <th className="px-6 py-3 text-center">
                                    Actions
                                </th>
                                <th className="px-6 py-3 text-right">
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
                    <button onClick={() => setUser(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <ActiveCompte onClose={setUser} user={user} />
                </div>
            }
            {activePartnerId &&
                <>
                    <button onClick={() => setActivePartnerId(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <SuperReport onEvent={handleSubmite} id={activePartnerId} />
                </>
            }
            {show &&
                <>
                    <button onClick={() => setShow(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <Display document={show} />
                </>
            }
            {geo &&
                <>
                    <button onClick={() => setGeo(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <ModifieGeo id={geo} onEvent={setGeo} />
                </>
            }
        </div>
    )
}
