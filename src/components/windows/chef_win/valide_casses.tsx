import { PrinteCasses } from '@/lib/tools/printer_models/printer_caisses';
import { handleInputChange } from '@/lib/tools/tools';
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

type form = {
  prix: string;
  acompte: string;
}


export default function ValideCasses({ onEvent, user, total }: { onEvent: (data: form) => void, user: Users, total: number }) {

  const componentRef = useRef<HTMLDivElement>(null);

  const data = {
    prix: "",
    acompte: ""
  }

  const [form, setForm] = useState(data)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.type === 'text') {
      handleInputChange(event as React.ChangeEvent<HTMLInputElement>);
    }
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const handlePrintAndSubmit = async () => {
    const sub = await onEvent(form) as unknown as boolean; // Submit the command
    console.log('Submission result:', sub);
    if (sub) {
      handlePrint(); // Trigger print
    }
  };


  return (
    <div className='fixed z-20 top-20 bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
      <div className='max-w-5xl mx-auto p-5 mt-10 bg-white'>
        <h1 className='mb-5 text-center text-xl font-semibold'>Valider le montant</h1>
        <div className='flex flex-col gap-3'>
          <p>Montant réel:</p>
          <input type='text' name='prix' className='p-2 inset-shadow-xs' placeholder='Entrer le montant' onChange={handleChange} />
          <p>Montant crédit a prêter:</p>
          <input type='text' name='acompte' className='p-2' placeholder='Entrer le montant' onChange={handleChange} />
          <p className='text-xl'>Total: <span className='font-bold'>{total.toFixed(2)} DA</span></p>
          <button onClick={handlePrintAndSubmit} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Confirmer</button>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <PrinteCasses total={total} user={user} real={Number(form.prix)} acount={Number(form.acompte)} />
        </div>
      </div>
    </div>
  )
}
