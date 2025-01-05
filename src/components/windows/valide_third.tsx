import React from 'react'

export default function ValideThird({ command , onBack, onSub} : {command: Result[], onBack: () => void, onSub: (data: number[]) => void}) {

    const ids = command.map((item) => item.id);

    return (
        <div className='fixed top-20 bottom-0 md:left-80 right-0 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto p-5 bg-white'>
                <h1 className='font-semibold text-2xl'>les information de commande</h1>
                <div className='flex gap-10 p-10'>
                    <div className='font-semibold text-xl'>
                        <h1>nom :</h1>
                        <h1>prénom :</h1>
                        <h1>Télephone :</h1>
                        <h1>Wilaya :</h1>
                        <h1>Email :</h1>
                        <h1>Groupe</h1>
                        <h1>Total command Sélectioné :</h1>
                    </div>
                </div>
                <div className='flex gap-2 text-xl justify-end'>
                    <button onClick={onBack} className='disabled:text-slate-400'>Retour</button>
                    <button  disabled className='disabled:text-slate-400'>Suivant</button>
                    <button onClick={() => onSub(ids)} className='text-green-500'>Submite</button>
                </div>
            </div>
        </div>
      )
}