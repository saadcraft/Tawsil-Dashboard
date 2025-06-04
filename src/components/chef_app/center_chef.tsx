"use client"

import { MdClose } from "react-icons/md"
import { FaSearch } from 'react-icons/fa'
import React, { useState } from 'react'
import Link from "next/link";
import ComplitDocument from "../windows/chef_win/complet_document"
import ActiveCompte from "../windows/chef_win/active-compte"
import { FormatDate, handleInputChange } from "@/lib/tools/tools"
import { useSearchLoader } from "../options/useSearchLoader";
import LoadingFirst from "../loading";
import Named from "@/lib/tools/named";

export default function CenterChef({ parteners, refresh }: { parteners: Partenaire[], refresh: () => void }) {

  const { isLoading, handleSearch } = useSearchLoader(['search']);
  // console.log(parteners)

  const [modify, setModify] = useState<Partenaire | null>(null)
  const [user, setUser] = useState<{ id: number, statue: boolean } | null>(null)

  const hundelModify = (info: Partenaire) => setModify(info);

  const pertener = parteners.map((pre, index) => {
    return (
      <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
        <td className="px-6 py-4">
          {index + 1}
        </td>
        <td>
          {FormatDate(pre.user.date_joined)}
        </td>
        <td className="px-6 py-4">
          {pre.user.username}
        </td>
        <td className="px-6 py-4">
          {pre.user.phone_number_1}
        </td>
        <td className="px-6 py-4">
          {pre.user.is_active ? "Activé" : "Désactivé"}
        </td>
        <td className="px-6 py-4">
          {Named(pre.type_compte?.name)}
        </td>
        <td className="px-6 py-4 text-right">
          {pre.user.is_active ? "Complité" : <button onClick={() => hundelModify(pre)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'>Complité dossie</button>}
        </td>
      </tr>
    )
  })


  return (
    <div className='py-5 px-5 sm:px-16'>
      <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
        <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
        <h1 className='font-bold'>{`Centre d'appel`}</h1>
      </div>
      <div className='p-10 pb-20 bg-white gap-10 rounded-md shadow-md'>
        <form onSubmit={handleSearch} className='mb-7 flex flex-col lg:flex-row items-center gap-5'>
          <div className="relative">
            <FaSearch className='absolute top-3 text-slate-500' />
            <input type="text" name="search" onChange={handleInputChange} placeholder='Recherche avec numéro' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
          </div>
          <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherche</button>
        </form>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-primer">
              <tr>
                <th className="px-6 py-3">
                  ID
                </th>
                <th className="px-6 py-3">
                  Date
                </th>
                <th className="px-6 py-3">
                  Partner
                </th>
                <th className="px-6 py-3">
                  Number
                </th>
                <th className="px-6 py-3">
                  état
                </th>
                <th className="px-6 py-3">
                  type
                </th>
                <th className="px-6 py-3 text-right">
                  dossie
                </th>
              </tr>
            </thead>
            <tbody className='odd:bg-six even:bg-fifth'>
              {pertener}
            </tbody>
          </table>
        </div>
      </div>
      {modify &&
        <div>
          <button onClick={() => setModify(null)} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
          <ComplitDocument user={modify} onsub={setModify} refresh={refresh} />
        </div>
      }
      {user &&
        <div>
          <button onClick={() => setUser(null)} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
          <ActiveCompte onClose={setUser} user={user} refresh={refresh} />
        </div>
      }
      {isLoading &&
        <LoadingFirst />
      }
    </div>
  )
}
