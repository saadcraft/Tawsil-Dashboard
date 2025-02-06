"use client"

import { FormatDate } from '@/lib/tools/tools'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiCheckDoubleLine, RiCloseFill, RiSendPlaneLine } from 'react-icons/ri'
import Reject from '../windows/centre_win/reject'
import { MdClose } from 'react-icons/md'
import { demandeAction } from '@/lib/actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import AcceptDemande from '../windows/centre_win/accepte'

type acceptDemande = {
    id: number;
    somme: number
}

export default function Demande({ dm }: { dm: Demande[] }) {

    const router = useRouter()

    const [reject, SetReject] = useState<number | null>(null)
    const [demande, SetDemande] = useState<acceptDemande | null>(null)

    const hundleClick = async (id: number, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const add = formData.get('recharge') as unknown as number;

        if (!add || add.toString().trim() === '') {
            toast.error('Veuillez entrer La somme.'); // Show an error message
            return; // Stop further execution
        }

        const res = await demandeAction({ flixy_id: id, etat: "accepte", some_a_envoye: add })
        if (res) {
            SetDemande(null)
            router.refresh()
        }
    }

    const data = dm.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-4 py-4">
                    {index + 1}
                </td>
                <td className="px-6 py-4">
                    {FormatDate(pre.date_de_creation)}
                </td>
                <td className="px-6 py-4">
                    {pre.superviseur.first_name} {pre.superviseur.last_name}
                </td>
                <td className="px-6 py-4">
                    {pre.superviseur.phone_number_1}
                </td>
                <td className="px-6 py-4">
                    {pre.somme.toFixed(2)} DA
                </td>
                <td className="px-6 py-4 text-right">
                    {pre.etat == "en_attente" &&
                        <div className='flex items-center justify-end gap-1'>
                            <button onClick={() => SetDemande({ id: pre.id, somme: pre.somme })} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'><RiSendPlaneLine /></button>
                            <button onClick={() => SetReject(pre.id)} className='bg-red-700 text-white p-1 rounded-md hover:bg-red-500'><RiCloseFill /></button>
                        </div>
                    }
                    {pre.etat == "refuse" && <p className='text-red-600 font-semibold flex items-center justify-end gap-1'><RiCloseFill />Refusé</p>}
                    {pre.etat == "accepte" && <p className='text-green-600 font-semibold flex items-center justify-end gap-1'><RiCheckDoubleLine />Accepté</p>}
                </td>
            </tr>
        )
    })
    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold'>Demande</h1>
            </div>
            <div className='p-3 pb-20 md:pb-20 bg-white md:p-10 rounded-md shadow-md'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-4 py-3">
                                    ID
                                </th>
                                <th className="px-6 py-3">
                                    Date
                                </th>
                                <th className="px-6 py-3">
                                    utilisateur
                                </th>
                                <th className="px-6 py-3">
                                    Télephone
                                </th>
                                <th className="px-6 py-3">
                                    Prix
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
            {reject &&
                <div>
                    <button onClick={() => SetReject(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <Reject onClose={SetReject} dm={reject} />
                </div>
            }
            {demande &&
                <div>
                    <button onClick={() => SetDemande(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <AcceptDemande onEvent={hundleClick} id={demande} />
                </div>
            }
        </div>
    )
}
