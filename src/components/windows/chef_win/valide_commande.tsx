import React, { useState, useEffect, useRef } from 'react'
import { FormatDate } from '@/lib/tools/tools'
import { useReactToPrint } from 'react-to-print';
import PrintableModel from '@/lib/tools/printer_models/printer_delivery';

export function ValideCommande({ command, onEvent, onBack }: { command: Result[], onEvent: () => void, onBack: () => void }) {
    return (
        <div className='fixed z-20 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='relative overflow-auto  w-full h-full mx-auto rounded-xl p-5 bg-white'>
                <h1 className='font-semibold text-2xl text-center'>les information de commande</h1>
                <div className="flex justify-center items-center h-5/6 gap-10 rounded-lg">
                    <div className="font-semibold text-lg space-y-4 text-gray-700">
                        <h1>nom :</h1>
                        <h1>prénom :</h1>
                        <h1>Télephone :</h1>
                        <h1>Wilaya :</h1>
                        <h1>Email :</h1>
                        <h1>Groupe :</h1>
                        <h1>Total command Sélectioné :</h1>
                    </div>
                    <div className="text-lg border-l pl-4 space-y-4 text-gray-600">
                        <h1>{command[0].livreur.partenneur.user.last_name}</h1>
                        <h1>{command[0].livreur.partenneur.user.first_name}</h1>
                        <h1>{command[0].livreur.partenneur.user.phone_number_1}</h1>
                        <h1>{command[0].livreur.partenneur.user.wilaya || "unknown"}</h1>
                        <h1>{command[0].livreur.partenneur.user.email || "unknown"}</h1>
                        <h1>{command[0].livreur.partenneur.user.groupe}</h1>
                        <h1>{command.length}</h1>
                    </div>
                </div>
                <div className='absolute bottom-3 right-3 flex gap-4 text-xl justify-end'>
                    <button onClick={onBack} className='disabled:text-slate-400'>Retour</button>
                    <button onClick={onEvent} className=''>Suivant</button>
                </div>
            </div>
        </div>
    )
}

export function ValideSecond({ command, onEvent, onBack }: { command: Result[], onEvent: () => void, onBack: () => void }) {

    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        const calculatedTotal = command.reduce(
            (sum, item) => sum + Number(item.prix_de_tax),
            0
        );
        setTotal(calculatedTotal);
    }, [command]); // Recalculate whenever `command` changes

    return (
        <div className='fixed z-20 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='relative overflow-auto w-full h-full mx-auto rounded-xl p-5 bg-white'>
                <h1 className='font-semibold text-2xl text-center'>Taxes taches</h1>
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
                                    Date
                                </th>
                                <th scope="col" className="text-right px-6 py-3">
                                    Prix de livraison
                                </th>
                                <th scope="col" className="text-right px-6 py-3">
                                    Taxe
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
                                        <td className="px-6 py-4 text-right"> {item.prix_de_tax.toFixed(2)} DA</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <h1 className='text-right p-2 font-semibold text-xl'>Total {total.toFixed(2)} DA</h1>

                </div>
                <div className='absolute bottom-3 right-3 flex gap-4 text-xl justify-end'>
                    <button onClick={onBack} className='disabled:text-slate-400'>Retour</button>
                    <button onClick={onEvent} className=''>Suivant</button>
                </div>
            </div>
        </div>
    )
}

export function ValideThird({ command, onBack, onSub, user }: { command: Result[], onBack: () => void, onSub: (data: number[]) => void, user: Users }) {

    const componentRef = useRef<HTMLDivElement>(null);

    const total = command.reduce((sum, item) => sum + Number(item.prix_de_tax), 0);

    const ids = command.map((item) => item.id);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    });


    const handlePrintAndSubmit = async () => {
        const sub = await onSub(ids) as unknown as boolean; // Submit the command
        if (sub) {
            handlePrint(); // Trigger print
        }
    };


    return (
        <div className='fixed z-20 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='relative w-full mx-auto h-full rounded-xl p-5 bg-white'>
                <h1 className='font-semibold text-2xl text-center'>Les loyer de term</h1>
                <div className='mt-3 overflow-auto h-5/6 flex gap-10 p-10'>
                    <div className='font-semibold text-xl'>
                        <h1>lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                            lorem sifo kda maravel chambre lorem sifo kda maravel chambre lorem sifo kda maravel chambre
                        </h1>
                    </div>
                </div>
                <div className='absolute bottom-3 right-3 flex gap-4 text-xl justify-end'>
                    <button onClick={onBack} className='disabled:text-slate-400'>Retour</button>
                    <button onClick={handlePrintAndSubmit} className='text-green-600 font-bold'>Confirmer</button>
                </div>
            </div>

            {/* Hidden Printable Component */}
            <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                    <PrintableModel command={command} user={user} tax={total} />
                </div>
            </div>
        </div>
    )
}