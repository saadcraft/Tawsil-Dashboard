"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Register } from "@/lib/auth";
import { toast } from "react-hot-toast"
import React, { useState } from 'react';
import LoadingFirst from '../loading';
import { TbLoader3 } from 'react-icons/tb';
import { FaSignInAlt } from 'react-icons/fa';
import { handleInputChange } from '@/lib/tools/tools';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterForm() {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [isClicked, seIsClicked] = useState<boolean>(false);
    const [showPass, setShowPass] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData.entries())
        // const password2 = formData.get('password2') as string;
        // const password = formData.get('password') as string;

        const isUsernameInvalid = (formData.get('username') as string).length < 6;
        const isPasswordSame = formObject.password2 !== formObject.password

        const isInvalid = Object.keys(formObject).some((field) =>
            field !== 'phone_number_2' && !formObject[field as keyof typeof formObject]
        );

        const loadingToastId = toast.loading('Register in...');

        if (isInvalid) {
            toast.error("certains champs sont obligatoires", { id: loadingToastId });
            return;
        }

        else if (isUsernameInvalid) {
            toast.error("surnom doit etre minimum 6 caractere", { id: loadingToastId });
            return;
        }

        else if (isPasswordSame) {
            toast.error("Le mot de passe et le mot de passe de confirmation doivent être identiques", { id: loadingToastId });
            return;
        }

        formObject.phone_number_1 = String(formObject.phone_number_1).replace(/^0+/, '');
        formObject.phone_number_1 = String(formObject.code) + String(formObject.phone_number_1);

        seIsClicked(true)


        try {
            const result = await Register(formObject);
            // const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/login`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     credentials: "include",
            //     body: JSON.stringify({ username, password })
            // });

            if (result?.code == 201) {
                setLoading(true)
                toast.success("Register réussie, attendé jusqu'à ce que je vous contacte et active votre compte", { id: loadingToastId });
                router.push('/login');
                return result;
            } else {
                if (typeof result?.data === 'string' && result.data.includes('127.0.0.1:8000')) {
                    toast.error("Problem with server", { id: loadingToastId });
                } else {
                    toast.error(result?.data, { id: loadingToastId });
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
            <h1 className='font-bold px-5 pb-5 text-xl'>Register</h1>
            <div className='p-5 md:p-10 bg-white grid xl:grid-cols-2 gap-10 rounded-md shadow-md'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-1 py-5 px-2'>
                    <p className="text-slate-500 font-semibold">Tawsil Star</p>
                    <h1 className="text-xl font-bold">S&apos;inscrire à starshop</h1>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="email">Nom</label>
                            <input type="Text" name="nom" id="username" placeholder="Entrer le nom" className='p-2 border border-slate-300 rounded-md' />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="email">Prénom</label>
                            <input type="Text" name="prenom" id="username" placeholder="Entrer le prénom" className='p-2 border border-slate-300 rounded-md' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email">Nom d&apos;utilisateur</label>
                        <input type="Text" name="username" id="username" placeholder="Entrer le nom d'utilisateur" className='p-2 border border-slate-300 rounded-md' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Entrer le email" className='p-2 border border-slate-300 rounded-md' />
                    </div>
                    <div className='flex flex-col gap-1 p-1'>
                        <p className='flex'><span>Numéro de téléphone 1</span><span className='text-red-600 text-2xl'>*</span></p>
                        <div className='flex gap-2'>
                            <input readOnly name='code' value="+213" className='py-2 md:px-2 border border-slate-300 rounded-md w-1/4' />
                            <input onChange={handleInputChange} type="text" name="phone_number_1" id="phone_number_1" placeholder='phone 1' className='p-2 border border-slate-300 rounded-md w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        <div className='relative flex flex-col gap-2 w-full'>
                            <label htmlFor="password">Mot de passe</label>
                            <input type={showPass ? "text" : "password"} name="password" id="password" placeholder='Entrer le mot de passe' className='p-2 border border-slate-300 rounded-md' />
                            <span onClick={() => setShowPass(pre => !pre)} className='absolute right-2 bottom-3 text-xl text-gray-500 cursor-pointer'>
                                {showPass ?
                                    <FaEye />
                                    :
                                    <FaEyeSlash />
                                }
                            </span>
                        </div>
                        <div className='relative flex flex-col gap-2 w-full'>
                            <label htmlFor="password2">Confirmé mot de passe</label>
                            <input type={showPass ? "text" : "password"} name="password2" id="password2" placeholder='Confirmé le mot de passe' className='p-2 border border-slate-300 rounded-md' />
                            <span onClick={() => setShowPass(pre => !pre)} className='absolute right-2 bottom-3 text-xl text-gray-500 cursor-pointer'>
                                {showPass ?
                                    <FaEye />
                                    :
                                    <FaEyeSlash />
                                }
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-between'>
                        <Link href="/login" className="p-2 hover:underline w-full flex items-center gap-2"><FaSignInAlt className='rotate-180' /> Revenir à la connexion</Link>
                        <div className="p-2 w-full">
                            <button disabled={isClicked} className='bg-blue-600 hover:bg-third w-full text-white text-xl p-2 rounded-md disabled:bg-opacity-20'>
                                {isClicked ?
                                    <div className={` bg-forth bg-opacity-50 text-xl flex justify-center items-center gap-3`}>
                                        <TbLoader3 className="animate-spin text-2xl" /> Loading ...
                                    </div>
                                    :
                                    "Register"
                                }
                            </button>
                        </div>
                    </div>
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
