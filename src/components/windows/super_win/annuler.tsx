import { demandeAction } from '@/lib/actions'
import { AproveDm } from '@/lib/super_action'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Annuler({ onClose, dm }: { onClose: (result: null) => void, dm: Demande }) {

    const router = useRouter()


    const handleReject = async (flixy_id: number) => {

        const res = await demandeAction({ flixy_id, etat: "annuler", some_a_envoye: 0 })
        if (res) {
            router.refresh()
            onClose(null)
        }
    }

    const handleAprove = async (flixy_id: number) => {

        const res = await AproveDm({ flixy_id })
        if (res) {
            router.refresh()
            onClose(null)
        }
    }

    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-2xl rounded-xl mx-auto p-5 mt-10 bg-white'>
                <h1 className='mb-5 font-bold text-center text-3xl'>
                    {dm.etat == "en_attente" && "Est ce que vous etre sur de annuler ce demande"}
                    {dm.etat == "accepte" && "Est ce que vous etre recieve votre solde"}
                </h1>
                <div className='flex gap-3 justify-center'>
                    {dm.etat == "en_attente" && <button onClick={() => handleReject(dm.id)} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Oui</button>}
                    {dm.etat == "accepte" && <button onClick={() => handleAprove(dm.id)} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Oui</button>}
                    <button onClick={() => onClose(null)} className='bg-red-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>No</button>
                </div>
            </div>
        </div>
    )
}