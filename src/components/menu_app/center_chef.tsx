"use client"

import { MdClose } from "react-icons/md"
import { FaSearch } from 'react-icons/fa'
import React, { useState } from 'react'
import Link from "next/link";
import { Partner } from "@/lib/type_module/center_type"
import ComplitDocument from "../windows/complet_document"

export default function CenterChef({ parteners }: { parteners: Partner[] }) {

  const [modify, setModify] = useState<Partner | null>(null)

  const hundelModify = (info: Partner) => setModify(info);

  const pertener = parteners.map((pre, index) => {
    return (
      <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
        <td className="px-6 py-4">
          {index + 1}
        </td>
        <td className="px-6 py-4">
          {pre.user.username}
        </td>
        <td className="px-6 py-4">
          {pre.user.phone_number_1}
        </td>
        <td className="px-6 py-4">
          {pre.user.is_active ? "true" : "false"}
        </td>
        <td className="px-6 py-4 text-right">
          <button onClick={() => hundelModify(pre)} className='bg-green-700 text-white p-1 rounded-md hover:bg-green-500'>Complité dossie</button>
        </td>
      </tr>
    )
  })


  return (
    <div className='py-5 px-5 sm:px-16'>
      <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
        <Link href="/role" className='font-semibold text-third'>Dashboard /</Link>
        <h1 className='font-bold'>{`Centre d'appel`}</h1>
      </div>
      <div className='p-10 bg-white gap-10 rounded-md shadow-md'>
        <div className='mb-7 flex justify-between items-center'>
          <FaSearch className='absolute text-slate-500' />
          <input type="text" name="search" placeholder='Search to table' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-primer">
              <tr>
                <th className="px-6 py-3">
                  ID
                </th>
                <th className="px-6 py-3">
                  Partner
                </th>
                <th className="px-6 py-3">
                  Number
                </th>
                <th className="px-6 py-3">
                  action
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
          <button onClick={() => setModify(null)} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
          <ComplitDocument user={modify} onsub={setModify} />
        </div>
      }
    </div>
  )
}
