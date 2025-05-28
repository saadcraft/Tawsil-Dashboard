import { ModifieProduct } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Image from 'next/image';
import { handleInputChange } from '@/lib/tools/tools';

export default function ModifyProduct({ pro, option, onsub, partner }: { pro: Produit, option: Catalogue[], onsub: (value: null) => void, partner: Partenaire | null }) {

    const router = useRouter()
    const [variants, setVariats] = useState<number>(pro.prixstar_shop.length || 1)

    // console.log(pro)

    const [image, setImage] = useState<File | null>(null)

    console.log(partner)

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Submite update...');

        const formData = new FormData(e.currentTarget)
        const formObject = Object.fromEntries(formData.entries())
        // const catal = formData.get('catalogue');

        const image = formData.get("image") as File | null;


        const filteredData = Object.fromEntries(
            Object.entries(formObject).filter(([, value]) => value !== "")
        );

        if (!image || image.size === 0) {
            delete filteredData.image;
        }

        // const requiredFields = ['name', 'price', 'catalogue_id', 'description']; // Add the names of the fields you want to check
        // const missingFields = requiredFields.filter(field => !formObject[field]);
        // if (missingFields.length > 0) {
        //     // Handle the case where required fields are empty
        //     toast.error("certaines informations sont requises", { id: loadingToastId })
        //     return; // Stop further execution
        // }


        const updatedProduct = { id: pro.id, ...filteredData };

        // console.log(updatedProduct)

        const res = await ModifieProduct(updatedProduct)

        if (res.success) {
            toast.success(res.message, { id: loadingToastId });
            router.refresh();
            onsub(null)
        } else {
            toast.error(res.message, { id: loadingToastId });
        }

    }

    return (
        <div className='fixed z-20 overflow-auto top-20 flex items-start bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='md:max-w-2xl w-full mx-auto p-5 mt-10 bg-white rounded-lg'>
                <h1 className='mb-5 text-2xl font-bold text-center'>Modifie produit</h1>
                <form onSubmit={handleCreate} className='flex flex-col gap-4' encType="multipart/form-data">
                    <div className='flex gap-3'>
                        <p>Status:</p>
                        {pro.disponibilite ? <span className='text-green-700 font-bold'>Disponible</span> : <span className='text-red-700 font-bold'>Pas disponible</span>}
                        <div className='flex md:gap-2 md:flex-row flex-col gap-5'>
                            <div>
                                <input type="radio" id="noValide" name="is_available" value="true" className="peer hidden" defaultChecked={pro.disponibilite === true} />
                                <label htmlFor="noValide" className='cursor-pointer border-2 rounded-lg text-slate-400 peer-checked:text-green-700 text-nowrap peer-checked:border-green-700 p-2'> Activé</label>
                            </div>
                            <div>
                                <input type="radio" id="valide" name="is_available" value="false" className="peer hidden" defaultChecked={pro.disponibilite === false} />
                                <label htmlFor="valide" className='cursor-pointer border-2 rounded-lg text-slate-400 peer-checked:text-red-700 peer-checked:border-red-700 p-2'>Désactiver</label>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 justify-start items-center'>
                        <p>Select image</p>
                        <label htmlFor='file' className='w-20 h-20 rounded-lg border-2 flex justify-center items-center cursor-pointer'>
                            {image ?
                                <Image height={100} width={100} src={URL.createObjectURL(image)} alt='product pucture' className='w-20 h-20 object-cover rounded-lg' />
                                :
                                <Image height={100} width={100} src={process.env.IMGS_DOMAIN + pro.image!} alt='product pucture' className='w-20 h-20 object-cover rounded-lg' />
                            }
                        </label>
                        <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} id='file' accept='images/*' name='image' className='hidden' />
                    </div>
                    <p>catégorie</p>
                    <select name='catalogue_id' className='p-2 w-full border border-slate-300 rounded-md'>
                        <option value={pro.catalogue ? pro.catalogue : ""}>{pro.catalogue ? option.find(pre => pre.id === pro.catalogue)?.name : 'Sélectionné catégorie'}</option>
                        {option.map((pre, index) => {
                            if (pro.catalogue != pre.id) {
                                return (
                                    <option key={index} value={pre.id}>{pre.name}</option>
                                )
                            }
                        })}
                    </select>
                    <p>Le nom de produit</p>
                    <input type='text' name='name' className='p-2 w-full border border-slate-300 rounded-md' placeholder='Entre le Nom de produit' defaultValue={pro.name} />
                    <p>Price</p>
                    <input type='text' name='price' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le prix' defaultValue={pro.price} />
                    {partner?.type_compte?.name === "starshop" &&
                        (
                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between'>
                                    <p>Variant</p>
                                    <div className='flex gap-2 cursor-pointer'>
                                        <span onClick={() => setVariats(prev => (prev > 1 ? prev - 1 : prev))} className='px-2.5 text-white text-lg font-bold bg-red-500 rounded-full'>-</span>
                                        <span onClick={() => setVariats(prev => prev + 1)} className='px-2 text-white text-lg font-bold bg-green-500 rounded-full' >+</span>
                                    </div>
                                </div>
                                {Array.from({ length: variants }).map((val, index) => (
                                    <div key={index} className='flex w-full gap-2'>
                                        <input onChange={handleInputChange} type='text' name={`prix_starshop[${index}][quantity]`} className='p-2 border border-slate-300 rounded-md w-full' placeholder='Entre le quantity' defaultValue={pro.prixstar_shop[index]?.quantity || ""} />
                                        <input onChange={handleInputChange} type='text' name={`prix_starshop[${index}][prix]`} className='p-2 border border-slate-300 rounded-md w-full' placeholder='Entre le prix' defaultValue={pro.prixstar_shop[index]?.prix || ""} />
                                        {pro.prixstar_shop?.[index]?.id ?
                                            <input readOnly name={`prix_starshop[${index}][id]`} className='hidden' placeholder='Entre le prix' value={pro.prixstar_shop?.[index]?.id || ""} />
                                            :
                                            null
                                        }
                                    </div>
                                ))}
                            </div>
                        )
                    }
                    <p>description</p>
                    <input type='text' name='description' className='p-2 border border-slate-300 rounded-md' placeholder='Entre le description' defaultValue={pro.description} />
                    <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
                </form>
            </div>
        </div>
    )
}
