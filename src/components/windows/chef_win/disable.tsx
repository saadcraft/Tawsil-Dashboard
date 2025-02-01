import React from 'react'
import { BlockUser } from '@/lib/auth';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function Disable({ user, onClose }: { user: number, onClose: (id: number) => void }) {

    const router = useRouter()

    const handleBlock = async (id: number) => {

        const loadingToastId = toast.loading('Submite Documment...');
        const res = await BlockUser({ id })
        if (res) {
            toast.success('Utilisateur supprimé avec succès', { id: loadingToastId });
            router.refresh()
            onClose(0)
        } else {
            toast.success('Problem connection', { id: loadingToastId });
        }
    }
    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-3xl rounded-xl mx-auto p-5 mt-10 bg-white'>
                <h1 className='mb-5 font-bold text-center text-3xl'>est ce que vous êtes sur de supprimer ce compte</h1>
                <div className='flex gap-3 justify-center'>
                    <button onClick={() => handleBlock(user)} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Yes</button>
                    <button onClick={() => onClose(0)} className='bg-red-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>No</button>
                </div>
            </div>
        </div>
    )
}
