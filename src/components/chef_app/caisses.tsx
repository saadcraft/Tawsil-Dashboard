"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { CloseCasses, OpenCasses } from "@/lib/action_client"
import ValideCasses from "../windows/chef_win/valide_casses"
import { MdClose } from "react-icons/md"
import { Result } from "@/lib/type_module/casses_type"
import { useRouter } from "next/navigation"
import { FormatDate } from "@/lib/tools/tools"

type form = {
  prix: string;
  acompte: string;
}

export default function Caisses({ cass, user }: { cass: Result[], user: Users }) {

  const [Close, setClose] = useState<boolean>(false)
  const router = useRouter()


  const handleWindow = () => { setClose(pre => !pre) }

  const handleClose = async (data: form) => {

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== "")
    );

    const result = await CloseCasses(filteredData);

    if (result) {
      setClose(pre => !pre)
      router.refresh()
      return true
    } else {
      return false
    }
  }

  const handleOpen = async () => {

    const result = await OpenCasses()
    if (result) {
      router.refresh()
    }
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cleint = formData.get('client') as string;
    router.push(`?search_date=${cleint}`);
  }


  const casses = cass.map((pre, index) => {
    return (
      <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
        <td className="px-6 py-4">
          {index + 1}
        </td>
        <td className="px-6 py-4">
          {FormatDate(pre.date_creationn)}
        </td>
        <td className="px-6 py-4">
          {pre.resut}
        </td>
        <td className="px-6 py-4">
          {pre.prix_reale}
        </td>
        <td className="px-6 py-4 text-right">
          {pre.etat ? "Ouver" : "Fermé"}
        </td>
      </tr>
    )
  })

  return (
    <div className='py-5 px-5 sm:px-16'>
      <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
        <Link href="/role" className='font-semibold text-third'>Dashboard /</Link>
        <h1 className='font-bold'>Les caisses</h1>
      </div>
      <div className='p-10 pb-20 bg-white gap-10 rounded-md shadow-md'>
        <div className='mb-7 flex justify-between items-center'>
          <form onSubmit={handleSearch} className='flex items-center gap-2'>
            <FaSearch className='absolute text-slate-500' />
            <input type="date" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
            <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherch</button>
          </form>
          <div className='flex justify-end gap-2'>
            <div className='p-2'>
              <button onClick={handleWindow} className='bg-red-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Close Caisse</button>
            </div>
            <div className='p-2'>
              <button onClick={handleOpen} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Open Caisse</button>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-primer">
              <tr>
                <th className="px-6 py-3">
                  ID
                </th>
                <th className="px-6 py-3">
                  Date de creation
                </th>
                <th className="px-6 py-3">
                  Montent
                </th>
                <th className="px-6 py-3">
                  Montant Réel
                </th>
                <th className="px-6 py-3 text-right">
                  Etat
                </th>
              </tr>
            </thead>
            <tbody className='odd:bg-six even:bg-fifth'>
              {casses}
            </tbody>
          </table>
        </div>
      </div>
      {Close ?
        <div>
          <button onClick={handleWindow} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
          <ValideCasses onEvent={handleClose} user={user} />
        </div>
        : ""}
    </div>
  )
}