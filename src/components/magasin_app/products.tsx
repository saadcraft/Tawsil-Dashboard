"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaPen, FaSearch, FaTrashAlt } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import AjouterProduct from '../windows/magasin_win/ajouter'
import Image from 'next/image'
import DeleteProduit from '../windows/magasin_win/delete_Product'
import { useRouter } from 'next/navigation'

export default function Products({ products, cat, magasin }: { products: Produit[], cat: Catalogue[], magasin: Magasin }) {

    const router = useRouter()


    const [add, setAdd] = useState<boolean>(false);
    const [delet, setDelet] = useState<number | null>(null);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;
        const categories = formData.get('catalogue_id') as string;

        router.push(`?category=${categories}&name=${cleint}`);
    }

    const Products = products.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                {/* <td className="px-6 py-4">
              <input type="checkbox" name='check' id="check" onChange={() => handleCheck(index)} disabled={pre.valide_payment} checked={pre.valide_payment ? false : pre.selected} />
            </td> */}
                <td className="px-6 py-4">
                    {pre.id}
                </td>
                <td className="px-6 py-4">
                    <Image src={`${process.env.IMGS_DOMAIN}${pre.image}`} width={50} height={50} alt='product image' className='w-12 h-12 object-cover rounded-md' />
                </td>
                <td className="px-6 py-4">
                    {pre.name}
                </td>
                <td className="px-6 py-4">
                    {pre.catalogue.name}
                </td>
                <td className="px-6 py-4">
                    {pre.price}
                </td>
                <td className="px-6 py-4 text-right">
                    <button className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'><FaPen /></button>
                    <button onClick={() => setDelet(pre.id)} className='ml-2 bg-red-700 text-white p-1 rounded-md hover:bg-red-500'><FaTrashAlt /></button>
                </td>
            </tr>
        )
    })

    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-semibold text-xl'>Gestion Produit</h1>
            </div>
            <div className='p-10 pb-20 bg-white rounded-md shadow-md'>
                <div className='flex lg:flex-row flex-col items-center justify-between mb-7 gap-5'>
                    <form onSubmit={handleSearch} className='flex items-center gap-2'>
                        <FaSearch className='absolute text-slate-500' />
                        <input type="text" name="client" placeholder='Recherche par Produit' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        <select name='catalogue_id' className='p-2 w-full border border-slate-300 rounded-md' >
                            <option value="">Sélectionné catégorie</option>
                            {cat.map((pre, index) => {
                                return (
                                    <option key={index} value={pre.id}>{pre.name}</option>
                                )
                            })}
                        </select>
                        <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherche</button>
                    </form>
                    <button onClick={() => setAdd(true)} className='bg-green-600 disabled:bg-opacity-20 w-full lg:w-auto px-4 py-2 text-white rounded-lg font-semibold'>Ajouter</button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    ID
                                </th>
                                <th className="px-6 py-3">
                                    Image
                                </th>
                                <th className="px-6 py-3">
                                    Produit
                                </th>
                                <th className="px-6 py-3">
                                    catégorie
                                </th>
                                <th className="px-6 py-3">
                                    Price
                                </th>
                                <th className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {Products}
                        </tbody>
                    </table>
                </div>
            </div>
            {add &&
                <div>
                    <button onClick={() => setAdd(false)} className='fixed z-50 top-28 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <AjouterProduct option={cat!} maga={magasin} onsub={setAdd} />
                </div>
            }
            {delet &&
                <div>
                    <button onClick={() => setDelet(null)} className='fixed z-50 top-28 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <DeleteProduit id={delet} onsub={setDelet} />
                </div>
            }
        </div>
    )
}
