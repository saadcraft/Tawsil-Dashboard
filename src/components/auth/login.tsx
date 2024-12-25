"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@/lib/auth";

export default function Login() {

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        console.log(username, password);
    
        const result = await SignIn({ username, password });

        if(result){
            router.push('/role');
        }

      };


  return (
    <div className='py-5 px-5 sm:px-16'>
        <h1 className='font-bold px-5 pb-5 text-xl'>Login</h1>
        <div className='p-10 bg-white grid xl:grid-cols-2 gap-10 rounded-md shadow-md'>
            <div className="hidden xl:block border-r-2">
                <div className="p-5 flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-3xl p-5 text-center mb-10">Login to Tawsil Start Dashbord</h1>
                    <Image className="bg-blue-600 rounded-xl" src="/tawsil-start.png" alt="Login" width={300} height={300} />
                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 py-5 px-0 sm:px-10 lg:px-20'>
                <p className="text-slate-500 font-semibold">Tawsil Start</p>
                <h1 className="text-xl font-bold">Sign in to Dashboard</h1>
                <div className='flex flex-col gap-2 p-2'>
                    <label htmlFor="email">Email</label>
                    <input type="Text" name="username" id="username" placeholder='User | email | number' className='p-3 border border-slate-300 rounded-md' />
                </div>
                <div className='flex flex-col gap-2 p-2'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='Password' className='p-3 border border-slate-300 rounded-md' />
                </div>
                <Link href="/forget" className="p-2 hover:underline">Forget password ?</Link>
                <div className="p-2">
                    <button className='bg-blue-600 hover:bg-third w-full text-white text-xl p-2 rounded-md'>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}
