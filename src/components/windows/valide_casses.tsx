import React, { useState } from 'react'

export default function ValideCasses({ onEvent } : {onEvent: (data : string) => void}) {

    const [value , setValue] = useState<string>("")

    const handleChange = (even : React.FormEvent<HTMLInputElement>) => {
        const inputValue  = (even.target as HTMLInputElement).value;

        if (!/^\d*$/.test(inputValue)) {
          (even.target as HTMLInputElement).value = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
        }

        const numericValue = inputValue.replace(/\D/g, "");

        setValue(numericValue);
    };


  return (
    <div className='fixed top-20 bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
      <div className='max-w-5xl mx-auto p-5 bg-white'>
          <h1 className='mb-5'>Valider le montant</h1>
          <div className='flex flex-col gap-10'>
            <input type='text' name='montant' className='p-2' placeholder='Entre le montant' onChange={handleChange}/>
            <button onClick={() => onEvent(value)} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
          </div>
      </div>
    </div>
  )
}
