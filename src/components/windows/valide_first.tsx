import React from 'react'

export default function ValideCommande({ command } : {command: Result[]}) {
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
                <div className='text-xl border-l pl-2'>
                    <h1>{command[0].livreur.partenneur.user.last_name}</h1>
                    <h1>{command[0].livreur.partenneur.user.first_name}</h1>
                    <h1>{command[0].livreur.partenneur.user.phone_number_1}</h1>
                    <h1>{command[0].livreur.partenneur.user.wilaya}</h1>
                    <h1>{command[0].livreur.partenneur.user.email}</h1>
                    <h1>{command[0].livreur.partenneur.user.groupe}</h1>
                    <h1>{command.length}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}
