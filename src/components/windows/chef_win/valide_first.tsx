import React from 'react'

export default function ValideCommande({ command, onEvent, onBack }: { command: Result[], onEvent: () => void, onBack: () => void }) {
    return (
        <div className='fixed z-20 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='relative overflow-auto  w-full h-full mx-auto rounded-xl p-5 bg-white'>
                <h1 className='font-semibold text-2xl text-center'>les information de commande</h1>
                <div className='flex overflow-auto h-5/6 gap-10 p-10'>
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
