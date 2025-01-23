"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { AddAgent, Data } from '@/lib/action_client'
import { toast } from "react-hot-toast"

export default function AjouteAgent() {

    const data: Data = {
        last_name: '',
        first_name: '',
        username: '',
        date_de_naissance: '',
        lieux: '',
        email: '',
        sexe: '',
        phone_number_1: '',
        phone_number_2: '',
        pass: '',
        password: ''
    }

    const [formData, setFormData] = useState<Data>(data);
    // TODO const [errors , setError] = useState([]) add errors
    console.log(formData)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const loadingToastId = toast.loading('Adding agent...');
        event.preventDefault();

        // Use formData instead of data for validation
        const isInvalid = Object.keys(formData).some((field) =>
            field !== 'phone_number_2' && !formData[field as keyof typeof formData]
        );

        const isUsernameInvalid = formData.username.length < 6;

        if (isInvalid) {
            // Display a simple error message if validation fails
            toast.error('Some fields are required', { id: loadingToastId });
            return;
        } else if (isUsernameInvalid) {
            toast.error('surnom doit etre minimum 6 caractere', { id: loadingToastId });
            return;
        }

        try {
            const result = await AddAgent(formData);

            if (result) {
                toast.success("User added successfuly", { id: loadingToastId });
                setFormData(data)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { id: loadingToastId });
            } else {
                toast.error('An unknown error occurred', { id: loadingToastId });
            }
        }

    };


    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
                <Link href="/role" className='font-semibold text-third'>Dashboard /</Link>
                <h1 className='font-semibold'>Agent Administratif /</h1>
                <h1 className='font-bold'>Ajouté Agent</h1>
            </div>
            <div className='py-10 max-w-2xl mx-auto bg-white rounded-md shadow-md'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 py-5 px-2 sm:px-5 lg:px-10'>
                    <h1 className="text-xl font-bold">Ajouté agent</h1>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Nom et prénome</span><span className='text-red-600 text-2xl'>*</span></p>
                        <div className='flex flex-col lg:flex-row gap-3'>
                            <input type="Text" name="last_name" id="last_name" placeholder='Nom' className='p-3 border border-slate-300 rounded-md' onChange={handleChange} value={formData.last_name} />
                            <input type="Text" name="first_name" id="first_name" placeholder='Prénom' className='p-3 border border-slate-300 rounded-md' onChange={handleChange} value={formData.first_name} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Username</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="Text" name="username" id="username" placeholder='username' className='p-3 border border-slate-300 rounded-md' onChange={handleChange} value={formData.username} />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Date de naissance</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="date" name="date_de_naissance" id="date_de_naissance" className='p-3 border border-slate-300 rounded-md' onChange={handleChange} value={formData.date_de_naissance} />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Lieux de naissance</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="Text" name="lieux" id="lieux" placeholder='Lieux de naissance' className='p-3 border border-slate-300 rounded-md' onChange={handleChange} value={formData.lieux} />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Email</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="email" name="email" id="email" placeholder='Email' className='p-3 border border-slate-300 rounded-md' onChange={handleChange} value={formData.email} />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Sexe</span><span className='text-red-600 text-2xl'>*</span></p>
                        <select className='border p-1' name='sexe' id="sex" defaultValue="" onChange={handleChange}>
                            <option value="">Seléctionée</option>
                            <option value="homme">Homme</option>
                            <option value="femme">Femme</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Numéro de téléphone 1</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="number" name="phone_number_1" id="phone_number_1" placeholder='phone 1' className='p-3 border border-slate-300 rounded-md' onChange={handleChange} value={formData.phone_number_1} />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <span>Numéro de téléphone 2</span>
                        <input type="number" name="phone_number_2" id="phone_number_2" placeholder='phone 2' className='p-3 border border-slate-300 rounded-md' onChange={handleChange} value={formData.phone_number_2} />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Mot de passe</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="password" name="password" id="password" placeholder='Password' className='p-3 border border-slate-300 rounded-md' onChange={handleChange} value={formData.password} />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Confirmer le mot de passe</span><span className='text-red-600 text-2xl'>*</span></p>
                        <input type="password" name="pass" id="pass" placeholder='Confirm password' className='p-3 border border-slate-300 rounded-md' onChange={handleChange} value={formData.pass} />
                    </div>
                    <div className="p-2">
                        <button className='bg-blue-600 hover:bg-third w-full text-white text-xl p-2 rounded-md'>Ajouté</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
