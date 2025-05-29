"use client"

import { UpdateMagPic } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Image from "next/image"

export default function PictureMagasin({ type, onsub, maga }: { type: "background" | "profile", onsub: (value: null) => void, maga: Magasin | null }) {

    const router = useRouter()
    const [image, setImage] = useState<File | null>(null)

    const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onsub(null);

        const loadingToastId = toast.loading('Submite update...');

        // Create a new FormData object from the form
        const formData = new FormData(e.currentTarget);

        // Get the file from the form data (with name="image_url")
        const image_background = formData.get("image_background") as File | null;
        const image = formData.get("image") as File | null;

        if (type === "background") {
            if (!image_background || image_background.size === 0) {
                toast.error("Image requise", { id: loadingToastId });
                return;
            }
            if (image_background.size > 5242880) {
                toast.error("L'image est grande, maximum 5 Mo", { id: loadingToastId });
                return;
            }
        } else {
            if (!image || image.size === 0) {
                toast.error("Image requise", { id: loadingToastId });
                return;
            }
            if (image.size > 5242880) {
                toast.error("L'image est grande, maximum 5 Mo", { id: loadingToastId });
                return;
            }
        }
        // Check if an image is selected


        // Prepare the user data
        const updatedUser = {
            magasin_id: maga?.id.toString() || '',
            image_background: type === "background" ? image_background : null,
            image: type !== "background" ? image : null,
        };

        // Send the data to the UpdateUser function
        const res = await UpdateMagPic(updatedUser, type);

        // If the response is successful, refresh the page or perform your other actions
        if (res.success) {
            toast.success(res.message, { id: loadingToastId });
            router.refresh();
        } else {
            toast.error(res.message, { id: loadingToastId });
        }
    };

    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='md:max-w-5xl max-w-full mx-auto rounded-xl p-5 mt-10 bg-white'>
                <h1 className='mb-5 text-center'>upload une image</h1>
                <form onSubmit={handleChange} className='flex flex-col gap-10' encType="multipart/form-data">
                    {type === "background" ?
                        <div className='flex gap-3 justify-start items-center'>
                            <p>Select image</p>
                            <label htmlFor='file' className='w-20 h-20 rounded-lg border-2 flex justify-center items-center cursor-pointer'>
                                {image ?
                                    <Image height={100} width={100} src={URL.createObjectURL(image)} alt='product pucture' className='w-20 h-20 object-cover rounded-lg' />
                                    :
                                    <p className='pb-2 font-bold text-4xl'>+</p>
                                }
                            </label>
                            <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} id='file' accept='image/*' name='image_background' className='hidden' />
                        </div>
                        :
                        <div className='flex gap-3 justify-start items-center'>
                            <p>Select image</p>
                            <label htmlFor='file' className='w-20 h-20 rounded-lg border-2 flex justify-center items-center cursor-pointer'>
                                {image ?
                                    <Image height={100} width={100} src={URL.createObjectURL(image)} alt='product pucture' className='w-20 h-20 object-cover rounded-lg' />
                                    :
                                    <p className='pb-2 font-bold text-4xl'>+</p>
                                }
                            </label>
                            <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} id='file' accept='image/*' name='image' className='hidden' />
                        </div>
                    }
                    <button type="submit" className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Sauvegarder</button>
                </form>
            </div>
        </div>
    )
}