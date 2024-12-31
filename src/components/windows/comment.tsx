import React from 'react'

export default function Comment({ id , onEvent} : {id: number, onEvent: (id : number, event: React.FormEvent<HTMLFormElement>) => void}) {
    
  return (
    <div className='fixed top-20 bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
        <div className='max-w-5xl mx-auto p-5 mt-10 bg-white'>
          <h1 className='mb-5'>Ajouté un commande</h1>
          <form onSubmit={(event) => onEvent(id, event)} className='flex flex-col gap-10'>
            <textarea name='comment' className='p-2' placeholder='Entre le commentaire'/>
            <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
          </form>
      </div>
    </div>
  )
}
