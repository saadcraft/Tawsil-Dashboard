import { handleInputChange } from '@/lib/tools/tools'
import React from 'react'

type acceptDemande = {
    id: number;
    somme: number
}

export default function AcceptDemande({ id, onEvent }: { id: acceptDemande, onEvent: (id: number, event: React.FormEvent<HTMLFormElement>) => void }) {



    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto rounded-xl p-5 mt-10 bg-white'>
                <h1 className='mb-5'>confirmer l&apos;envoyer de la somme</h1>
                <form onSubmit={(event) => onEvent(id.id, event)} className='flex flex-col gap-5'>
                    <input name='recharge' className='p-2 rounded-md border' placeholder='Entre la somme' defaultValue={id.somme} onChange={handleInputChange} />
                    <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Confirmer</button>
                </form>
            </div>
        </div>
    )
}