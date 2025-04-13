"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaPen, FaSearch, FaTrashAlt, FaRegCheckCircle } from 'react-icons/fa'
import { MdClose, MdBlock, MdOutlineStar } from 'react-icons/md'
import AjouterProduct from '../windows/magasin_win/ajouter'
import Image from 'next/image'
import DeleteProduit from '../windows/magasin_win/delete_Product'
import { useRouter } from 'next/navigation'
import ModifyProduct from '../windows/magasin_win/modifie_product'
import { ModifieProduct } from '@/lib/auth'
import toast from 'react-hot-toast'
import ClientComment from '../windows/magasin_win/client_comment'
import { useSearchLoader } from '../options/useSearchLoader'
import LoadingFirst from '../loading'

export default function Products({ products, cat, magasin }: { products: Produit[], cat: Catalogue[], magasin: Magasin }) {

    const { isLoading, handleSearch } = useSearchLoader(['name', 'category']);

    const router = useRouter()


    const [add, setAdd] = useState<boolean>(false);
    const [delet, setDelet] = useState<number | null>(null);
    const [modify, setModify] = useState<Produit | null>(null);
    const [page, setPage] = useState<number[] | null>(null);

    const handleStatus = async (id: number, disponibilite: boolean) => {
        const loadingToastId = toast.loading('Submite update...');

        const res = await ModifieProduct({ id, disponibilite })

        if (res.success) {
            toast.success(disponibilite ? "Activé" : "Désactivé", { id: loadingToastId });
            router.refresh();
        } else {
            toast.error(res.message, { id: loadingToastId });
        }
    }

    const Products = products.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                {/* <td className="px-6 py-4">
              <input type="checkbox" name='check' id="check" onChange={() => handleCheck(index)} disabled={pre.valide_payment} checked={pre.valide_payment ? false : pre.selected} />
            </td> */}
                <td className="px-4 py-4">
                    {pre.id}
                </td>
                <td className="px-2 py-4">
                    {pre.image &&
                        <Image src={`${process.env.IMGS_DOMAIN}${pre.image}`} width={50} height={50} alt='product image' className='w-12 h-12 object-cover rounded-md' />
                    }
                </td>
                <td className="px-4 py-4">
                    {pre.name}
                </td>
                <td className="px-4 py-4">
                    {cat.find(pro => pro.id === pre.catalogue)?.name}
                </td>
                <td className="px-4 py-4">
                    {pre.price}
                </td>
                <td className="px-4 py-4">
                    {pre.disponibilite ? <span className='text-green-700 font-bold'>Disponible</span> : <span className='text-red-700 font-bold'>Pas disponible</span>}
                </td>
                <td className="px-3 py-7 flex justify-end gap-1 text-right">
                    {pre.disponibilite ?
                        <button onClick={() => handleStatus(pre.id, false)} className='bg-red-700 text-white p-1 px-2 rounded-md hover:bg-red-500' title='désactiver'><MdBlock /></button>
                        :
                        <button onClick={() => handleStatus(pre.id, true)} className='bg-green-700 text-white p-1 px-2 rounded-md hover:bg-green-500' title='activé'><FaRegCheckCircle /></button>
                    }
                    <button onClick={() => setModify(pre)} className='bg-green-700 text-white p-1 px-2 rounded-md hover:bg-green-500' title='modifie'><FaPen /></button>
                    <button onClick={() => setDelet(pre.id)} className='bg-red-700 text-white p-1 px-2 rounded-md hover:bg-red-500' title='supprimer'><FaTrashAlt /></button>
                    <span onClick={() => setPage([pre.id, 1])} className='w-14 cursor-pointer flex gap-0.5 font-bold items-center justify-center text-center border-2 hover:border-gold6 py-0.5 rounded-lg'>{pre.rating} <MdOutlineStar className='text-lg text-gold6' /></span>
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
            <div className='p-3 md:p-10 pb-20 md:pb-20 bg-white rounded-md shadow-md'>
                <div className='flex lg:flex-row flex-col items-center justify-between mb-7 gap-5'>
                    <form onSubmit={handleSearch} className='flex flex-col lg:flex-row items-center gap-5'>
                        <div className='relative'>
                            <FaSearch className='absolute top-3 text-slate-500' />
                            <input type="text" name="name" placeholder='Recherche par Produit' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        </div>
                        <select name='category' className='p-2 w-full border border-slate-300 rounded-md' >
                            <option value="">Sélectionné catégorie</option>
                            {magasin.cataloguqe.map((pre, index) => {
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
                                <th className="px-4 py-3">
                                    ID
                                </th>
                                <th className="px-4 py-3">
                                    Image
                                </th>
                                <th className="px-4 py-3">
                                    Produit
                                </th>
                                <th className="px-4 py-3">
                                    catégorie
                                </th>
                                <th className="px-4 py-3">
                                    Price
                                </th>
                                <th className="px-4 py-3">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-right">
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
            {modify &&
                <div>
                    <button onClick={() => setModify(null)} className='fixed z-50 top-28 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <ModifyProduct pro={modify} option={cat!} onsub={setModify} />
                </div>
            }
            {page &&
                <div>
                    <button onClick={() => setPage(null)} className='fixed z-50 top-28 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
                    <ClientComment comment={page} />
                </div>
            }
            {isLoading &&
                <LoadingFirst />
            }
        </div>
    )
}
