import React from 'react'

export default function Search({ id, onEvent, livreur }: { id: number, onEvent: (id: number, event: React.FormEvent<HTMLFormElement>) => void, livreur: LivreurMagasine[] }) {



    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto p-5 mt-10 rounded-xl bg-white'>
                <h1 className='mb-5 font-bold text-xl text-center'>rechercher livreur</h1>
                <form onSubmit={(event) => onEvent(id, event)} className='flex flex-col gap-10'>
                    <select name='livreur' className='border-b-2 p-2 outline-none hover:border-third cursor-pointer'>
                        <option value="">Seléctionée Livreur</option>
                        {livreur.map((pre, index) => {
                            if (pre.is_available) {
                                return (
                                    <option key={index} value={pre.id}>{pre.partenneur_first_name || 'null'} {pre.partenneur_last_name || 'null'}</option>
                                )
                            }
                        })}
                    </select>
                    <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Confirmer</button>
                </form>
            </div>
        </div>
    )
}