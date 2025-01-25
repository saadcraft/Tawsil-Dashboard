"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaSignInAlt } from "react-icons/fa"
import { sendForget } from '@/lib/auth'
import { toast } from "react-hot-toast"

export default function Forget() {

    const handleSubmite = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loadingToastId = toast.loading('Sending email...');

        const formData = new FormData(event.currentTarget)
        const formObject = Object.fromEntries(formData.entries())
        const add = formData.get('email') as string;

        if (!add || add.trim() === '') {
            toast.error('Please enter a email.', { id: loadingToastId }); // Show an error message
            return; // Stop further execution
        }

        try {
            const response = await sendForget(formObject)

            if (response.code == 200) {
                toast.success('Email has been send', { id: loadingToastId });
            } else {
                toast.error(response, { id: loadingToastId });
            }
        } catch {
            toast.error("Problem connection", { id: loadingToastId });
        }
    }

    return (
        <div className='py-5 px-5 sm:px-16'>
            <h1 className='font-bold px-5 pb-5 text-xl'>Login</h1>
            <div className='p-10 bg-white grid xl:grid-cols-2 gap-10 rounded-md shadow-md'>
                <div className="hidden xl:block border-r-2">
                    <div className="p-5 flex flex-col justify-center items-center">
                        <h1 className="font-semibold text-3xl p-5 text-center mb-10">Login to Tawsil Start Dashbord</h1>
                        <Image className="rounded-xl" src="/login.svg" alt="Login" width={300} height={300} />
                    </div>
                </div>
                <form onSubmit={handleSubmite} className='flex flex-col gap-4 py-5 px-0 sm:px-10 lg:px-20'>
                    <p className="text-slate-500 font-semibold">Tawsil Start</p>
                    <h1 className="text-xl font-bold">Forget Password</h1>
                    <div className='flex flex-col gap-2 p-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder='Enter emain' className='p-3 border border-slate-300 rounded-md' />
                    </div>
                    <p className="p-2">We will send you mail for resolve problem</p>
                    <Link href="/login" className="p-2 hover:underline flex items-center gap-2"><FaSignInAlt className='rotate-180' /> Return to login</Link>
                    <div className="p-2">
                        <button className='bg-blue-600 hover:bg-third w-full text-white text-xl p-2 rounded-md'>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
