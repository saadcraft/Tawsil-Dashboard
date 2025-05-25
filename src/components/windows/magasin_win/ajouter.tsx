import { addProduct } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Image from 'next/image';
import { handleInputChange } from '@/lib/tools/tools';

export default function AjouterProduct({ option, maga, onsub }: { option: Catalogue[], maga: Magasin, onsub: (value: false) => void }) {

    const router = useRouter()

    const [image, setImage] = useState<File | null>(null)

    // console.log(option)

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Submite update...');

        const formData = new FormData(e.currentTarget)
        const formObject = Object.fromEntries(formData.entries())
        // const catal = formData.get('catalogue');


        const filteredData = Object.fromEntries(
            Object.entries(formObject).filter(([, value]) => value !== "")
        );

        const requiredFields = ['name', 'price', 'catalogue_id', 'description']; // Add the names of the fields you want to check
        const missingFields = requiredFields.filter(field => !formObject[field]);
        if (missingFields.length > 0) {
            // Handle the case where required fields are empty
            toast.error("certaines informations sont requises", { id: loadingToastId })
            return; // Stop further execution
        }

        const updatedUser = { magasin_id: maga.id, ...filteredData };

        const res = await addProduct(updatedUser)

        if (res.success) {
            toast.success(res.message, { id: loadingToastId });
            router.refresh();
            onsub(false)
        } else {
            toast.error(res.message, { id: loadingToastId });
        }

    }

    return (
        <div className='fixed z-20 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='md:max-w-2xl w-full mx-auto p-5 mt-10 bg-white rounded-lg'>
                <h1 className='mb-5 text-2xl font-bold text-center'>Ajoueté produit</h1>
                <form onSubmit={handleCreate} className='flex flex-col gap-4' encType="multipart/form-data">
                    <div className='flex gap-3 justify-start items-center'>
                        <p>Select image</p>
                        <label htmlFor='file' className='w-20 h-20 rounded-lg border-2 flex justify-center items-center cursor-pointer'>
                            {image ?
                                <Image height={100} width={100} src={URL.createObjectURL(image)} alt='product pucture' className='w-20 h-20 object-cover rounded-lg' />
                                :
                                <p className='pb-2 font-bold text-4xl'>+</p>
                            }
                        </label>
                        <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} id='file' accept='images/*' name='image' className='hidden' />
                    </div>
                    <p>catégorie</p>
                    <select name='catalogue_id' className='p-2 w-full border border-slate-300 rounded-md' >
                        <option value="">Sélectionné catégorie</option>
                        {option.map((pre, index) => {
                            return (
                                <option key={index} value={pre.id}>{pre.name}</option>
                            )
                        })}
                    </select>
                    <p>Le nom de produit</p>
                    <input type='text' name='name' className='p-2 w-full border border-slate-300 rounded-md' placeholder='Entre le Nom de produit' />
                    <p>Price</p>
                    <input onChange={handleInputChange} type='text' name='price' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le prix' />
                    <p>description</p>
                    <input type='text' name='description' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le description' />
                    <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
                </form>
            </div>
        </div>
    )
}
