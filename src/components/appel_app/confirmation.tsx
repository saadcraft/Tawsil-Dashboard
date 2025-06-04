"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdBlock, MdClose, MdOutlineWorkspacePremium, MdDeliveryDining } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { FormatDate } from '@/lib/tools/tools'
import { RiCheckDoubleLine, RiCheckFill, RiLoader3Fill } from 'react-icons/ri'
import { TbCancel } from 'react-icons/tb'
import OrderInfo from '../windows/magasin_win/order_info'
import CancelCommande from '../windows/magasin_win/cancel_order'
import { FaSearch } from 'react-icons/fa'
import { useSearchLoader } from '../options/useSearchLoader'
import LoadingFirst from '../loading'
import ConfirmationReminder from '../windows/starshop_win/alert_confirmation'
import { changeStatus } from '@/lib/stores_api'


type ChangeEtat = {
    id: number;
    etat: "search" | "pending" | "confirmed" | "ready" | "delivered" | "canceled" | "in_progress";
}

export default function CommandeCentre({ commande }: { commande: Order[] }) {

    const { isLoading, handleSearch } = useSearchLoader(['search', 'confirmation']);

    const router = useRouter()

    console.log(commande)

    // console.log(commande)


    const [show, setShow] = useState<{ id: number; total: number } | null>(null);
    const [changeEtat, setChnageEtat] = useState<ChangeEtat | null>(null);
    const [confirmation, setConfirmation] = useState<{
        isOpen: boolean,
        orderId: number | null,
        orderUser: string
    }>({
        isOpen: false,
        orderId: null,
        orderUser: "",
    })

    const openConfirmation = (id: number, name: string) => {
        setConfirmation({
            isOpen: true,
            orderId: id,
            orderUser: name,
        })
    }

    const closeConfirmation = () => {
        setConfirmation({
            isOpen: false,
            orderId: null,
            orderUser: "",
        })
    }


    const handleConfirme = async (commande_id: number) => {

        const res = await changeStatus({ commande_id, confirmation: true })
        if (res) {
            router.refresh()
            closeConfirmation();
        }

    }

    const Products = commande.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                {/* <td className="px-6 py-4">
              <input type="checkbox" name='check' id="check" onChange={() => handleCheck(index)} disabled={pre.valide_payment} checked={pre.valide_payment ? false : pre.selected} />
            </td> */}
                <td className="px-6 py-4">
                    {pre.id}
                </td>
                <td className="px-6 py-4">
                    {FormatDate(pre.created_at)}
                </td>
                <td className="px-6 py-4">
                    {pre.client_info.phone_number_1}
                </td>
                <td className="px-6 py-4">
                    {pre.status == "pending" && <p className='text-gray-500 font-semibold flex items-center gap-1'><RiLoader3Fill className='animate-spin mt-0.5' />En attente</p>}
                    {pre.status == "search" && <p className='text-gray-500 font-semibold flex items-center gap-1'><RiLoader3Fill className='animate-spin mt-0.5' />En cours</p>}
                    {pre.status == "confirmed" && <p className='text-yellow-600 font-semibold flex items-center gap-1'><RiLoader3Fill className='animate-spin mt-0.5' />En préparation</p>}
                    {pre.status == "ready" && <p className='text-green-600 font-semibold flex items-center gap-1'><RiCheckFill className='mt-0.5' />Préte</p>}
                    {pre.status == "in_progress" && <p className='text-yellow-600 font-semibold flex items-center gap-1 animate-pulse'><MdDeliveryDining className='mt-0.5' />En route</p>}
                    {pre.status == "delivered" && <p className='text-green-600 font-semibold flex items-center gap-1'><RiCheckDoubleLine className='mt-0.5' />Livrer</p>}
                    {pre.status == "annule_par_livreur" && <p className='text-red-600 font-semibold flex items-center gap-1'><TbCancel className='mt-0.5' />Livreur Annuler</p>}
                    {pre.status == "annule_par_client" && <p className='text-red-600 font-semibold flex items-center gap-1'><TbCancel className='mt-0.5' />Client Annuler</p>}
                    {pre.status == "canceled" && <p className='text-red-600 font-semibold flex items-center gap-1'><TbCancel className='mt-0.5' />Annuler</p>}
                </td>
                <td className="px-6 py-4">
                    {pre.total_price}
                </td>
                <td className="px-3 py-4 flex justify-end gap-1 text-right">

                    {pre.status === "pending" ?
                        !pre.confirmation ?
                            <div className='flex gap-1'>
                                <button onClick={() => openConfirmation(pre.id, pre.client_info.first_name + pre.client_info.last_name)} className='bg-green-700 text-white p-1 px-3 rounded-md hover:bg-green-500' title='confirmé'>Confirmé</button>
                                <button onClick={() => setChnageEtat({ id: pre.id, etat: "canceled" })} className='bg-red-700 text-white p-1 px-3 rounded-md hover:bg-red-500' title='annulé'><MdBlock /></button>
                            </div>
                            :
                            <p className='text-green-500 text-lg font-bold'>confirmed</p>
                        :
                        null
                    }
                    {/*   :
                        <button onClick={() => handleStatus(pre.id, true)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500' title='activé'><FaRegCheckCircle /></button>
                    }
                    <button onClick={() => setModify(pre)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500' title='modifie'><FaPen /></button> */}
                    <button onClick={() => setShow({ id: pre.id, total: Number(pre.total_price) })} className='bg-gray-200 text-black p-1 border-1 rounded-md hover:bg-gray-500 hover:text-white' title='Détail de commande'>Détails</button>
                    {pre.type_livraison === "premium" &&
                        <span className='bg-yellow-600 text-white p-1 px-1.5 text-lg rounded-md hover:bg-yellow-500 cursor-pointer' title='Premium commande'>
                            <MdOutlineWorkspacePremium />
                        </span>
                    }
                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-semibold text-xl'>Confirmation de commande</h1>
            </div>
            <div className='p-3 md:p-10 pb-20 md:pb-20 bg-white rounded-md shadow-md'>
                <div className='flex lg:flex-row flex-col items-center justify-between mb-7 gap-5'>
                    <form onSubmit={handleSearch} className='flex flex-col lg:flex-row items-center gap-5'>
                        <div className='relative'>
                            <FaSearch className='absolute top-3 text-slate-500' />
                            <input type="text" name="search" placeholder='Recherche par Produit' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        </div>
                        <div className="inline-flex bg-gray-100 rounded-lg p-1">
                            <div className="relative">
                                <input
                                    type="radio"
                                    id="confirmed"
                                    name="confirmation"
                                    value="True"
                                    defaultChecked
                                    className="peer sr-only"
                                />
                                <label
                                    htmlFor="confirmed"
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-transparent rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:text-gray-900 peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-sm"
                                >
                                    Confirmé
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="radio"
                                    id="not-confirmed"
                                    name="confirmation"
                                    value="False"
                                    className="peer sr-only"
                                />
                                <label
                                    htmlFor="not-confirmed"
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-transparent rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:text-gray-900 peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-sm"
                                >
                                    No Confirmé
                                </label>
                            </div>
                        </div>
                        <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherche</button>
                    </form>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                    Télephone
                                </th>
                                <th className="px-6 py-3">
                                    Status
                                </th>
                                <th className="px-6 py-3">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {Products}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* {add &&
                <div>
                    <button onClick={() => setAdd(false)} className='fixed z-50 top-28 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <AjouterProduct option={cat!} maga={magasin} onsub={setAdd} />
                </div>
            }*/}
            {changeEtat &&
                <div>
                    <button onClick={() => setChnageEtat(null)} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
                    <CancelCommande id={changeEtat.id} onsub={setChnageEtat} etat={changeEtat.etat} />
                </div>
            }
            {show &&
                <div>
                    <button onClick={() => setShow(null)} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
                    <OrderInfo id={show.id} total={show.total} />
                </div>
            }
            {confirmation.isOpen &&
                <ConfirmationReminder closeDelet={closeConfirmation} handleSubmit={handleConfirme} confirmation={confirmation} />
            }
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}
