import React from 'react'

export default function Display({ document }: { document: Partenaire }) {
    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='xl:w-2/3 w-full mx-auto rounded-xl p-10 mt-10 bg-white'>
                <h1 className='mb-5 text-xl text-center font-bold'>Informations utilisateur</h1>
                <div className='sm:flex justify-around'>
                    <div>
                        <p><span className='font-bold'>Nom et prénom : </span> {`${document.user.last_name} ${document.user.first_name}`}</p>
                        <p><span className='font-bold'>Email : </span> {`${document.user.email}`}</p>
                        <p><span className='font-bold'>Télephone : </span> {`${document.user.phone_number_1}`}</p>
                        <p><span className='font-bold'>Télephone 2 : </span> {` ${document.user.phone_number_2 ? document.user.phone_number_2 : '/'}`}</p>
                        <p><span className='font-bold'>Type de compte : </span> {` ${document.type_compte.name}`}</p>
                        <p><span className='font-bold'>Wilaya : </span> {` ${document.user.wilaya}`}</p>
                        <p><span className='font-bold'>Lieux : </span> {` ${document.user.lieux ? document.user.lieux : "/"}`}</p>
                        <p><span className='font-bold'>Groupe : </span> {` ${document.user.groupe}`}</p>
                    </div>
                    <div>
                        <p><span className='font-bold'>RC : </span> {`${document.RC ? document.RC : "/"}`}</p>
                        <p><span className='font-bold'>Numero nationale : </span> {`${document.card_number ? document.card_number : "/"}`}</p>
                        <p><span className='font-bold'>Numero d&apos;act : </span> {`${document.numero_act ? document.numero_act : "/"}`}</p>
                        <p><span className='font-bold'>Nif : </span> {` ${document.Nif ? document.Nif : '/'}`}</p>
                        {document.vihucule &&
                            <>
                                <p><span className='font-bold'>Type véhicule : </span> {` ${document.vihucule.type_vehicule ? document.vihucule.type_vehicule : "/"}`}</p>
                                <p><span className='font-bold'>Marque : </span> {` ${document.vihucule.marque ? document.vihucule.marque : "/"}`}</p>
                                <p><span className='font-bold'>Matricule : </span> {` ${document.vihucule.matricule ? document.vihucule.matricule : "/"}`}</p>
                                <p><span className='font-bold'>N° assurance : </span> {` ${document.vihucule.num_assurance ? document.vihucule.num_assurance : "/"}`}</p>
                                <p><span className='font-bold'>N° scanner : </span> {` ${document.vihucule.num_scanner ? document.vihucule.num_scanner : "/"}`}</p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
