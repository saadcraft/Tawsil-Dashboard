"use client"

import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import PrintableModel from '@/lib/tools/printer_models/printer_delivery';

export default function ValideThird({ command, onBack, onSub }: { command: Result[], onBack: () => void, onSub: (data: number[]) => void }) {

    const componentRef = useRef<HTMLDivElement>(null);

    const total = command.reduce((sum, item) => sum + Number(item.delivery_price), 0);

    const taxe = total * 12 / 100

    const ids = command.map((item) => item.id);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    });


    const handlePrintAndSubmit = () => {
        handlePrint(); // Trigger print
        onSub(ids); // Submit the command
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
                    <button onClick={handlePrintAndSubmit} className='text-green-600 font-bold'>Submite</button>
                </div>
            </div>

            {/* Hidden Printable Component */}
            <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                    <PrintableModel command={command} total={total} tax={taxe} />
                </div>
            </div>
        </div>
    )
}