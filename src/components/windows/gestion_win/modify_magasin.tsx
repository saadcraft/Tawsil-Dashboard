import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { modifyMagasin } from '@/lib/gestion_action';


export default function ModifyMagasinWin({ magasin, onSub }: { magasin: MagasinType, onSub: (value: MagasinType | null) => void }) {
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loadingToastId = toast.loading('Submite Updating...');

        const formData = new FormData(e.currentTarget)
        const formObject = Object.fromEntries(formData.entries())


        const filteredData = Object.fromEntries(
            Object.entries(formObject).filter(([, value]) => value !== "")
        );
        if (Object.keys(filteredData).length === 0) {
            toast.error('No fields to update.', { id: loadingToastId });
            return;
        }
        const updatedUser = { id: magasin.id.toString(), ...filteredData };
        try {
            const res = await modifyMagasin(updatedUser)
            if (res) {
                toast.success('Updated with Succesfully', { id: loadingToastId });
                router.refresh()
                onSub(null)
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
        <div className='fixed z-10 overflow-auto top-20 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='xl:w-1/3 w-full mx-auto p-5 mt-10 bg-white'>
                <h1 className='mb-5 text-2xl font-bold text-center'>modify type magasin</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <p>Le nom de type</p>
                    <input type='text' name='name' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le Nom de type' defaultValue={magasin.name} />
                    <p>description</p>
                    <textarea name='description' className='p-2 border border-slate-300 rounded-md' placeholder='Entre Description' defaultValue={magasin.description} />
                    <p>Tax</p>
                    <input type='number' name='tax_tawsile' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le Tax' defaultValue={magasin.tax_tawsile} />
                    <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
                </form>
            </div>
        </div>
    )
}
