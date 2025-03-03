"use client"

import { sendEmail } from '@/lib/actions';
import React, { useState } from 'react'
import { BsHeadset } from "react-icons/bs";
import { toast } from "react-hot-toast"

export default function ContactSupport() {

    const [apeare, setApeare] = useState<boolean>(false)

    const handleSubmite = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const formObject = Object.fromEntries(formData.entries())

        try {
            setApeare(false)
            event.currentTarget.reset();

            await sendEmail(formObject)
        } catch {

            toast.error('Problem de connection');
        }
    }

    return (
        <div className='fixed z-10 bottom-3 right-3'>
            <div className={`absolute bottom-20 right-0 p-2 transition-all bg-white shadow-md rounded-md ${apeare ? " " : "translate-x-96"}`}>
                <form onSubmit={handleSubmite} className='relative z-10 w-full flex flex-col gap-3'>
                    <input type='text' name="obj" className='border w-64 text-xl rounded-md p-2' placeholder="Entre L'object" />
                    <textarea name="message" className='border resize-none text-md w-64 h-64 rounded-md p-2' placeholder='Entre le message' />
                    <p><span className='text-red-600'>*</span>tu as 5 messages par jour</p>
                    <button className='p-2 bg-third hover:bg-blue-700 text-white w-full font-bold rounded-xl'>Envoyer</button>
                </form>
                <span className='absolute z-0 right-4 -bottom-3 p-3 rotate-45 shadow-md bg-white'></span>
            </div>
            <div onClick={() => setApeare(!apeare)} className='p-2 rounded-full cursor-pointer bg-primer'>
                <BsHeadset className='text-3xl text-white' />
                <div className='absolute p-0.5 rounded-full bg-six left-0 -bottom-1'>
                    <div className='bg-green-600 w-3 h-3 rounded-full'></div>
                </div>
            </div>
        </div>
    )
}
