import React, { useState } from 'react'

export default function Comment({ id, onEvent }: { id: number, onEvent: (id: number, event: React.FormEvent<HTMLFormElement>) => void }) {

  const [inputInto, setInputInto] = useState("")

  //   1 Contacter 
  // 2 Ne répond pas 
  // 3 injoignable 
  // 3 Numéro erroné 
  // 4 Demande d'annulation

  const messages = ["Contacter", "Ne répond pas", "injoignable", "Demande d'annulation"];

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setInputInto(`${value}`);
  };

  return (
    <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
      <div className='max-w-5xl mx-auto rounded-xl p-5 mt-10 bg-white'>
        <h1 className='mb-5'>Ajouté un commentaire</h1>
        <form onSubmit={(event) => onEvent(id, event)} className='flex flex-col gap-10'>
          <div className="flex flex-wrap gap-2">
            {messages.map((category, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-primary cursor-pointer"
                  onClick={() => setInputInto(category)}
                >
                  {category}
                  {/* <span
                  // onClick={() => handleRemoveCategory(category.id)}
                  className="ml-1 text-center cursor-pointer rounded-full p-1 hover:bg-gray-300"
              >
                  <p className="w-5 h-5 font-semibold" >x</p>
              </span> */}
                </div>
              )
            })

            }
          </div>
          {/* <select name='model' className='border-b outline-none py-2 pl-1 focus:border-slate-950'>
            <option value="">Selectioné model</option>
            <option value="Injoignable">Injoignable</option>
            <option value="Télephone fermée">Télephone fermée</option>
            <option value="Ne réponds pas">ne réponds pas</option>
          </select> */}
          <textarea name='comment' className='p-3 border-2 rounded-md' placeholder='Entre le commentaire' value={inputInto} onChange={handleChange} />
          <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Ajouter</button>
        </form>
      </div>
    </div>
  )
}
