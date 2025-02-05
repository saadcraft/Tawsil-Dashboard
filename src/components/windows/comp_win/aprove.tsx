import { AproveCass } from '@/lib/comptable_action'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Aprove({ casse, onClose }: { casse: Caisses, onClose: (result: null) => void }) {

    const router = useRouter()

    const handleAprove = async (cassie_id: number) => {
        const approve = await AproveCass({ cassie_id })

        if (approve) {
            router.refresh()
            onClose(null)
        }
    }


    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-3xl rounded-xl mx-auto p-5 mt-10 bg-white'>
                <h1 className='mb-5 font-bold text-center text-3xl'>
                    Est ce que sur aprové cet caisse
                </h1>
                <div className='flex gap-3 justify-center'>
                    <button onClick={() => handleAprove(casse.id)} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Yes</button>
                    <button onClick={() => onClose(null)} className='bg-red-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>No</button>
                </div>
            </div>
        </div>
    )
}
