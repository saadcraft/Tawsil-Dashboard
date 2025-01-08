import React from 'react'
import { useRouter } from 'next/navigation';
import { ActiveUser } from '@/lib/call_action';
import toast from 'react-hot-toast';

export default function ActiveCompte({ onClose, user }: { onClose: (result: null) => void, user: { id: number, statue: boolean } }) {

    const router = useRouter()

    console.log(user)

    const handleBlock = async (user_id: number) => {

        const loadingToastId = toast.loading('Submite Documment...');

        try {
            const res = await ActiveUser({ user_id })
            if (res) {
                toast.success('User activated with successfuly', { id: loadingToastId });
                router.refresh()
                onClose(null)
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
        <div className='fixed z-10 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-3xl rounded-xl mx-auto p-5 mt-10 bg-white'>
                <h1 className='mb-5 font-bold text-center text-3xl'>Es-tu sur activé ce compte</h1>
                <div className='flex gap-3 justify-center'>
                    <button onClick={() => handleBlock(user.id)} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Yes</button>
                    <button onClick={() => onClose(null)} className='bg-red-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>No</button>
                </div>
            </div>
        </div>
    )
}
