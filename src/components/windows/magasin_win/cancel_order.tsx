import { changeStatus, DeleteProduct } from '@/lib/stores_api';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function CancelCommande({ id, etat, onsub }: { id: number, etat: "pending" | "confirmed" | "search" | "ready" | "delivered" | "canceled", onsub: (value: null) => void }) {

    const router = useRouter()

    const handleDelete = async (commande_id: number) => {

        const res = await changeStatus({ commande_id, status: etat })
        if (res) {
            router.refresh()
            onsub(null)
        }
    }

    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-3xl rounded-xl mx-auto p-5 mt-10 bg-white'>
                <h1 className='mb-5 font-bold text-center text-3xl'>
                    {etat === "canceled" ?
                        "est ce que vous êtes sur de annuler ce commande" : "est ce que vous sûr d'avoir préparé cette demande"
                    }

                </h1>
                <div className='flex gap-3 justify-center'>
                    <button onClick={() => handleDelete(id)} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Oui</button>
                    <button onClick={() => onsub(null)} className='bg-red-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>No</button>
                </div>
            </div>
        </div>
    )
}
