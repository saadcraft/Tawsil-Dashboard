"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import { toast } from "react-hot-toast"
import { AddSuperViseur } from '@/lib/super_action'
import { handleInputChange } from '@/lib/tools/tools'

export default function AddSuperviseur() {

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const formObject = Object.fromEntries(formData.entries())

        // Use formData instead of data for validation
        const isInvalid = Object.keys(formObject).some((field) =>
            field !== 'phone_number_2' && !formObject[field as keyof typeof formObject]
        );

        const isUsernameInvalid = (formData.get('username') as string).length < 6;

        if (isInvalid) {
            // Display a simple error message if validation fails
            toast.error('champs (*) droit remplire obligatoire');
            return;
        } else if (isUsernameInvalid) {
            toast.error('surnom doit etre minimum 6 caractere');
            return;
        }

        formObject.phone_number_1 = String(formObject.phone_number_1).replace(/^0+/, '');
        formObject.phone_number_1 = String(formObject.code) + String(formObject.phone_number_1);

        if (formObject.phone_number_2) {
            formObject.phone_number_2 = String(formObject.phone_number_2).replace(/^0+/, '');
            formObject.phone_number_2 = String(formObject.code) + String(formObject.phone_number_2);
        }

        // console.log(formObject)

        const result = await AddSuperViseur(formObject);

        if (result) {
            formRef.current?.reset();
        }
    };


    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-semibold'>Agent Administratif /</h1>
                <h1 className='font-bold'>Ajouté Agent</h1>
            </div>
            <div className='py-10 max-w-2xl mx-auto bg-white rounded-md shadow-md'>
                <form onSubmit={handleSubmit} ref={formRef} className='flex flex-col gap-4 py-5 px-2 sm:px-5 lg:px-10'>
                    <h1 className="text-xl font-bold">Ajouté agent</h1>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Nom et prénome</span><span className='text-red-600 text-2xl'>*</span></p>
                        <div className='flex flex-col lg:flex-row gap-3'>
                            <input type="Text" name="last_name" id="last_name" placeholder='Nom' className='p-3 border border-slate-300 rounded-md' />
                            <input type="Text" name="first_name" id="first_name" placeholder='Prénom' className='p-3 border border-slate-300 rounded-md' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Username</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="Text" name="username" id="username" placeholder='username' className='p-3 border border-slate-300 rounded-md' />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Date de naissance</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="date" name="date_de_naissance" id="date_de_naissance" className='p-3 border border-slate-300 rounded-md' />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Lieux de naissance</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="Text" name="lieux" id="lieux" placeholder='Lieux de naissance' className='p-3 border border-slate-300 rounded-md' />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Email</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="email" name="email" id="email" placeholder='Email' className='p-3 border border-slate-300 rounded-md' />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Sexe</span><span className='text-red-600 text-2xl'>*</span></p>
                        <select className='border p-1' name='sexe' id="sex">
                            <option value="">Seléctionée</option>
                            <option value="homme">Homme</option>
                            <option value="femme">Femme</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Numéro de téléphone 1</span><span className='text-red-600 text-2xl'>*</span></p>
                        <div className='flex gap-2'>
                            <input readOnly name='code' value="+213" className='p-3 border border-slate-300 rounded-md w-1/4' />
                            <input onChange={handleInputChange} type="text" name="phone_number_1" id="phone_number_1" placeholder='phone 1' className='p-3 border border-slate-300 rounded-md w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <span>Numéro de téléphone 2</span>
                        <div className='flex gap-2'>
                            <input readOnly name='code' value="+213" className='p-3 border border-slate-300 rounded-md w-1/4' />
                            <input onChange={handleInputChange} type="text" name="phone_number_2" id="phone_number_2" placeholder='phone 2' className='p-3 border border-slate-300 rounded-md w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Mot de passe</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="password" name="password" id="password" placeholder='Password' className='p-3 border border-slate-300 rounded-md' />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Confirmer le mot de passe</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="password" name="pass" id="pass" placeholder='Confirm password' className='p-3 border border-slate-300 rounded-md' />
                    </div>
                    <div className="p-2">
                        <button className='bg-blue-600 hover:bg-third w-full text-white text-xl p-2 rounded-md'>Ajouté</button>
                    </div>
                </form>
            </div>
        </div>
    )
}