import React, { useState, useEffect } from 'react'
import { FormatDate } from '@/lib/tools/timer'

export default function ValideSecond({ command, onEvent, onBack }: { command: Result[], onEvent: () => void, onBack: () => void }) {

    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        const calculatedTotal = command.reduce(
            (sum, item) => sum + Number(item.delivery_price),
            0
        );
        setTotal(calculatedTotal);
    }, [command]); // Recalculate whenever `command` changes

    const taxe = total * 12 / 100

    return (
        <div className='fixed z-10 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='relative overflow-auto w-full h-full mx-auto rounded-xl p-5 bg-white'>
                <h1 className='font-semibold text-2xl text-center'>Taxes téches</h1>
                <div className="relative overflow-auto h-5/6  p-4">
                    <table className="w-full text-sm text-left rtl:text-right0">
                        <thead className="text-xs uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Livreur
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Time
                                </th>
                                <th scope="col" className="text-right px-6 py-3">
                                    Livraison Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {command.map((item, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.livreur.partenneur.user.first_name} {item.livreur.partenneur.user.last_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {FormatDate(item.created_at)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {item.delivery_price}DA
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <h1 className='text-right p-2 font-semibold text-xl'>total {total}.00 DA</h1>
                    <h1 className='text-right p-2 font-semibold text-xl'>Taxe {taxe}.00 DA</h1>
                </div>
                <div className='absolute bottom-3 right-3 flex gap-4 text-xl justify-end'>
                    <button onClick={onBack} className='disabled:text-slate-400'>Retour</button>
                    <button onClick={onEvent} className=''>Suivant</button>
                </div>
            </div>
        </div>
    )
}
