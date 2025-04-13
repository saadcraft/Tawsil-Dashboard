"use client"

import { FormatDate } from '@/lib/tools/tools'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import SuperDemande from '../windows/super_win/add_demande'
import { MdClose } from 'react-icons/md'
import toast from 'react-hot-toast'
import { addDemande } from '@/lib/super_action'
import { useRouter } from 'next/navigation'
import { RiLoader3Fill, RiCheckDoubleLine, RiCloseFill } from "react-icons/ri";
import { TbCancel, TbCheck } from "react-icons/tb";
import Annuler from '../windows/super_win/annuler'
import { useSearchLoader } from '../options/useSearchLoader'
import LoadingFirst from '../loading'

export default function Recharge({ history }: { history: Demande[] }) {

    const { isLoading, handleSearch } = useSearchLoader(['date']);

    const router = useRouter()

    const [demande, SetDemande] = useState<boolean>(false)
    const [annuler, setAnnuler] = useState<Demande | null>(null)


    const handleSubmite = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const add = formData.get('recharge') as unknown as number;

        if (!add || add.toString().trim() === '') {
            toast.error('Veuillez entrer La somme.'); // Show an error message
            return; // Stop further execution
        }

        const res = await addDemande({ somme: add })
        if (res) {
            SetDemande(false)
            router.refresh()
        }
    }

    // console.log(history)

    const data = history.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    {pre.id}
                </td>
                <td className="px-6 py-4">
                    {FormatDate(pre.date_de_creation)}
                </td>
                <td className="px-6 py-4">
                    {pre.somme.toFixed(2)} DA
                </td>
                <td className="px-6 py-4">
                    {pre.etat == "en_attente" && <p className='text-yellow-600 font-semibold flex items-center gap-1'><RiLoader3Fill className='animate-spin' />En attente</p>}
                    {pre.etat == "refuse" && <p className='text-red-600 font-semibold flex items-center gap-1'><RiCloseFill />Refusé</p>}
                    {pre.etat == "accepte" && <p className='text-green-600 font-semibold flex items-center gap-1'><RiCheckDoubleLine />Accepté</p>}
                    {pre.etat == "annuler" && <p className='text-gray-700 font-semibold flex items-center gap-1'><TbCancel />Annuler</p>}
                </td>
                <td className="px-6 py-4 text-right">
                    {pre.etat == "accepte" && !pre.appouvie_par_super_v ? <button onClick={() => setAnnuler(pre)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'><TbCheck /></button> :
                        pre.etat == "accepte" && <p className='text-green-600 font-semibold'>Approuvé</p>}
                    {pre.etat == "en_attente" && <button onClick={() => setAnnuler(pre)} className='bg-red-600 text-white p-1 rounded-md hover:bg-green-500'><TbCancel /></button>}
                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold'>Recharge</h1>
            </div>
            <div className='p-3 pb-20 md:pb-20 bg-white md:p-10 rounded-md shadow-md'>
                <div className='flex lg:flex-row flex-col items-center justify-between mb-7 gap-5'>
                    <form onSubmit={handleSearch} className='flex flex-col lg:flex-row items-center gap-5'>
                        <div className="relative">
                            <FaSearch className='absolute top-3 text-slate-500' />
                            <input type="date" name="date" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        </div>
                        <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherche</button>
                    </form>
                    <button onClick={() => SetDemande(true)} className='bg-green-600 disabled:bg-opacity-20 lg:w-auto px-4 py-2 text-white rounded-lg font-semibold'>Demander</button>
                </div>
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
                                    La somme
                                </th>
                                <th className="px-6 py-3">
                                    état
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Raport
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {data}
                        </tbody>
                    </table>
                </div>
            </div>
            {demande &&
                <div>
                    <button onClick={() => SetDemande(false)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <SuperDemande onEvent={handleSubmite} />
                </div>
            }
            {annuler &&
                <div>
                    <button onClick={() => setAnnuler(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <Annuler onClose={setAnnuler} dm={annuler} />
                </div>
            }
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}