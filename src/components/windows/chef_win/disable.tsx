import React from 'react'
import { BlockUser } from '@/lib/auth';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function Disable({ user, onClose }: { user: number, onClose: (id: number) => void }) {

    const router = useRouter()

    const handleBlock = async (id: number) => {

        const loadingToastId = toast.loading('Submite Documment...');

        try {
            const res = await BlockUser({ id })
            if (res) {
                toast.success('User Blocked with successfuly', { id: loadingToastId });
                router.refresh()
                onClose(0)
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
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-3xl rounded-xl mx-auto p-5 mt-10 bg-white'>
                <h1 className='mb-5 font-bold text-center text-3xl'>Es-tu sur désactiver ce compte</h1>
                <div className='flex gap-3 justify-center'>
                    <button onClick={() => handleBlock(user)} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Yes</button>
                    <button onClick={() => onClose(0)} className='bg-red-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>No</button>
                </div>
            </div>
        </div>
    )
}
