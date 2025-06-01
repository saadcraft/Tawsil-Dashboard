"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@/lib/auth";
import { toast } from "react-hot-toast"
import React, { useState } from 'react';
import LoadingFirst from '../loading';
import { TbLoader3 } from 'react-icons/tb';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [isClicked, seIsClicked] = useState<boolean>(false);
    const [showPass, setShowPass] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        const loadingToastId = toast.loading('Logging in...');

        if (username === "" || password === "") {
            toast.error("certains champs sont obligatoires", { id: loadingToastId });
            return;
        }

        seIsClicked(true)


        try {
            const result = await SignIn({ username, password });
            // const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/login`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     credentials: "include",
            //     body: JSON.stringify({ username, password })
            // });

            if (result?.code == 200) {
                setLoading(true)
                toast.success('Connexion réussie', { id: loadingToastId });
                router.push('/dashboard');
                return result;
            } else {
                if (result.includes('127.0.0.1:8000')) {
                    toast.error("Problem with server", { id: loadingToastId });
                } else {
                    toast.error(result, { id: loadingToastId });
                }
                setTimeout(() => {
                    seIsClicked(false);
                }, 3000);
            }
        } catch {
            toast.error("Problem connection", { id: loadingToastId });
        }
        setTimeout(() => {
            seIsClicked(false);
        }, 3000);

    };


    return (
        <div className='py-5 px-5 sm:px-16'>
            <h1 className='font-bold px-5 pb-5 text-xl'>Se connecter</h1>
            <div className='p-10 bg-white grid xl:grid-cols-2 gap-10 rounded-md shadow-md'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 py-5 px-0 sm:px-10 lg:px-20'>
                    <p className="text-slate-500 font-semibold">Tawsil Star</p>
                    <h1 className="text-xl font-bold">Connectez-vous au tableau de bord</h1>
                    <div className='flex flex-col gap-2 p-2'>
                        <label htmlFor="email">Nom d&apos;utilisateur</label>
                        <input type="Text" name="username" id="username" placeholder="Entrer le nom d'utilisateur" className='p-3 border border-slate-300 rounded-md' />
                    </div>
                    <div className='relative flex flex-col gap-2 p-2'>
                        <label htmlFor="password">Mot de passe</label>
                        <input type={showPass ? "text" : "password"} name="password" id="password" placeholder='Entrer le mot de passe' className='p-3 border border-slate-300 rounded-md' />
                        <span onClick={() => setShowPass(pre => !pre)} className='absolute right-4 bottom-6 text-xl text-gray-500 cursor-pointer'>
                            {showPass ?
                                <FaEye />
                                :
                                <FaEyeSlash />
                            }
                        </span>
                    </div>
                    <Link href="/forget" className="p-2 hover:underline">Oublier le mot de passe ?</Link>
                    <div className="p-2">
                        <button disabled={isClicked} className='bg-blue-600 hover:bg-third w-full text-white text-xl p-2 rounded-md disabled:bg-opacity-20'>
                            {isClicked ?
                                <div className={` bg-forth bg-opacity-50 text-xl flex justify-center items-center gap-3`}>
                                    <TbLoader3 className="animate-spin text-2xl" /> Loading ...
                                </div>
                                :
                                "Se connecter"
                            }
                        </button>
                    </div>
                    <Link href="/register" className="p-2 flex text-blue-700 justify-end hover:underline">S&apos;inscrire à starshop ?</Link>
                </form>
                <div className="hidden xl:block border-l-2">
                    <div className="p-5 flex flex-col justify-center items-center">
                        <h1 className="font-semibold text-3xl p-5 text-center mb-10">Connectez-vous au Tawsil Star</h1>
                        <Image className="rounded-xl" src="/login.svg" alt="Login" width={300} height={300} />
                    </div>
                </div>
            </div>
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}
