"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaSignInAlt } from "react-icons/fa"
import { changePassword } from '@/lib/auth'
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'

export default function Reset({ token, id }: { token: string, id: string }) {

    const router = useRouter()

    console.log(token, id)

    const handleSubmite = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loadingToastId = toast.loading('Logging in...');

        const formData = new FormData(event.currentTarget)
        const password = formData.get("new_password") as string;
        const confirmPassword = formData.get("password") as string;

        if (!password || password !== confirmPassword) {
            toast.error('Passwords do not match.', { id: loadingToastId });
            return;
        }

        try {
            const response = await changePassword({ new_password: password, token: token, uid: id })

            if (response) {
                toast.success('Password has been changed', { id: loadingToastId });
                router.push('/login')
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { id: loadingToastId });
            } else {
                toast.error('An unknown error occurred', { id: loadingToastId });
            }
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
                    <h1 className="text-xl font-bold">Change Password</h1>
                    <div className='flex flex-col gap-2 p-2'>
                        <label htmlFor="new_password">New Password</label>
                        <input type="password" name="new_password" id="email" placeholder='Entre new password' className='p-3 border border-slate-300 rounded-md' />
                        <label htmlFor="password">retype new password</label>
                        <input type="password" name="password" id="email" placeholder='retype new password' className='p-3 border border-slate-300 rounded-md' />
                    </div>
                    <Link href="/login" className="p-2 hover:underline flex items-center gap-2"><FaSignInAlt className='rotate-180' /> Return to login</Link>
                    <div className="p-2">
                        <button className='bg-blue-600 hover:bg-third w-full text-white text-xl p-2 rounded-md'>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
