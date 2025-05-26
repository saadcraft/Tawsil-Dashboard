"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdBlock, MdClose, MdOutlineWorkspacePremium, MdOutlineQrCodeScanner, MdDeliveryDining } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FormatDate } from '@/lib/tools/tools'
import { RiCheckDoubleLine, RiCheckFill, RiLoader3Fill } from 'react-icons/ri'
import { TbCancel } from 'react-icons/tb'
import OrderInfo from '../windows/magasin_win/order_info'
import CancelCommande from '../windows/magasin_win/cancel_order'
import { useNotificationStore } from '@/lib/tools/store/web_socket'
import { FaRegCheckCircle } from 'react-icons/fa'
import Search from '../windows/magasin_win/search_deliver'
import QRcode from '../windows/magasin_win/qrcode'
import { useSearchLoader } from '../options/useSearchLoader'
import LoadingFirst from '../loading'


type ChangeEtat = {
    id: number;
    etat: "search" | "pending" | "confirmed" | "ready" | "delivered" | "canceled" | "in_progress";
}

export default function Commande({ commande, magasin, livreurs }: { commande: Order[], magasin: Magasin, livreurs: LivreurMagasine[] }) {

    const { isLoading, handleSearch } = useSearchLoader(['etat']);

    const router = useRouter()
    const { sendMessage, socket } = useNotificationStore();

    // console.log(commande)


    useEffect(() => {
        if (!socket) return;
        const handleMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                // if (data.message?.status === "confirmed" || data.message?.status === "canceled" || data.message?.status == "pending" || data.message?.status == "in_progress") {
                if (data) {
                    router.refresh(); // Refresh the page
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        // Attach the message event listener
        socket.addEventListener('message', handleMessage);

        // Clean up the event listener when the component unmounts
        return () => socket.removeEventListener('message', handleMessage);
    }, [socket, router]);


    const [show, setShow] = useState<{ id: number; total: number } | null>(null);
    const [changeEtat, setChnageEtat] = useState<ChangeEtat | null>(null);
    const [sendRq, setSendRq] = useState<number | null>(null)
    const [qrCode, setQrCode] = useState<number | null>(null)

    const handleAction = async (id: number, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loadingToastId = toast.loading("changer d'état en cours...");

        const formData = new FormData(event.currentTarget);
        const livreur = formData.get("livreur") as string | null;

        let message;

        if (livreur) {
            message = {
                type: "assigne",
                livreur_id: livreur,
                commande_id: id
            }

        } else {

            message = {
                type: "broadcast",
                commande_id: id,
                wilaya: magasin.wilaya
                // additional data if needed
            };
        }

        // console.log(message)

        try {

            const send = await sendMessage(message) as unknown as { success: string };

            if (send?.success) {
                setSendRq(null); // Reset the send request state
                // Optionally, you can set a success message or perform other actions
                toast.success(send.success, { id: loadingToastId });
                router.refresh()
            } else {
                toast.error("Problem network", { id: loadingToastId });
            }
            // Handle success
        } catch {
            // Handle any errors that occur during the sendMessage call
            toast.error("Problem network", { id: loadingToastId });
            // Optionally, you can set an error message or perform other actions
        }
    };

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
                    {pre.livreur?.partenneur.user.phone_number_1 || "En cours"}
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
                    {pre.status === "pending" &&
                        <>
                            <button onClick={() => setChnageEtat({ id: pre.id, etat: "canceled" })} className='bg-red-700 text-white p-1 px-3 rounded-md hover:bg-red-500' title='annulé'><MdBlock /></button>
                            <button onClick={() => setSendRq(pre.id)} className='bg-green-700 text-white p-1 px-3 rounded-md hover:bg-green-500' title='accepté'><FaRegCheckCircle /></button>
                        </>
                    }
                    {pre.status === "search" &&
                        <>
                            <button className='bg-gray-200 text-black p-1 px-1.5 border-1 rounded-md hover:bg-gray-500 hover:text-white' title='désactiver'><RiLoader3Fill className='animate-spin mt-0.5' /></button>
                        </>
                    }
                    {pre.status === "confirmed" &&
                        <>
                            <button onClick={() => setChnageEtat({ id: pre.id, etat: "ready" })} className='bg-green-700 flex items-center text-white p-1 rounded-md hover:bg-green-500' title='désactiver'><FaRegCheckCircle />Prét</button>
                        </>
                    }
                    {pre.status === "ready" &&
                        <>
                            <button onClick={() => setQrCode(pre.magasin)} className='bg-gray-200 text-black p-1 px-1.5 border-1 rounded-md hover:bg-gray-500 hover:text-white' title='QR code'><MdOutlineQrCodeScanner className='mt-0.5' /></button>
                        </>
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
                <h1 className='font-semibold text-xl'>Gestion Produit</h1>
            </div>
            <div className='p-3 md:p-10 pb-20 md:pb-20 bg-white rounded-md shadow-md'>
                <div className='flex lg:flex-row flex-col items-center justify-between mb-7 gap-5'>
                    <form onSubmit={handleSearch} className='flex flex-col lg:flex-row items-center gap-5'>
                        {/* <div className='relative'>
                            <FaSearch className='absolute top-3 text-slate-500' />
                            <input type="text" name="client" placeholder='Recherche par Produit' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        </div> */}
                        <select name='etat' className='p-2 w-full border border-slate-300 rounded-md' >
                            <option value="">Sélectionné Status</option>
                            <option value="pending">En attente</option>
                            <option value="search">En cours</option>
                            <option value="ready">Prét</option>
                            <option value="confirmed">en préparation</option>
                            <option value="delivered">livré</option>
                            <option value="canceled">annulé</option>
                        </select>
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
                                    Livreur
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
            {sendRq &&
                <div>
                    <button onClick={() => setSendRq(null)} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
                    <Search id={sendRq} onEvent={handleAction} livreur={livreurs} />
                </div>
            }
            {qrCode &&
                <div>
                    <button onClick={() => setQrCode(null)} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
                    <QRcode id={qrCode} />
                </div>

            }
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}
