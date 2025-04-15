"use client"

import Image from "next/image"
import { getGroup } from '@/lib/gestion_action'
import Named, { Wilaya } from '@/lib/tools/named'
import React, { useState } from 'react'
import {
  MdMailOutline,
  MdLocalPhone,
  MdLocationPin
} from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { TbLoader3 } from 'react-icons/tb';

export default function Group({ id, onEvent, onClose }: { id: Partenaire, onEvent: (id: number, event: React.FormEvent<HTMLFormElement>) => void, onClose: (value: null) => void }) {

  const [city, setCity] = useState<number | null>(null)
  const [group, setGroup] = useState<Groupes[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  function findCityByCode(code: number) {
    const city = Wilaya.find(c => c.code === code);
    return city ? city.name : '';
  }

  const handleGroup = async ({ wilaya }: { wilaya: string }) => {
    setCity(Number(wilaya))
    setGroup(null)
    setLoading(true)
    try {
      const data = await getGroup({ wilaya })
      if (data.data.length > 0) {
        setGroup(data.data)
        setLoading(false)
      } else {
        setGroup(null)
        setLoading(false)
      }
    } catch {
      setGroup(null)
    }
  }

  return (
    <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
      <div className='max-w-5xl mx-auto p-5 mt-10 rounded-xl bg-white'>
        <div className="p-5">
          <h1 className='mb-5 font-bold text-xl text-center'>Regroupé</h1>
          {/* User Information Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <Image
                  height={50}
                  width={50}
                  src={id.user.image_url ? `${process.env.IMGS_DOMAIN}${id.user.image_url}` : "/placeholder.svg"}
                  alt={id.user.username}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-2 space-y-2 text-left">
                <h2 className="text-lg font-semibold">{Named(id.type_compte?.name)}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <MdMailOutline className="h-4 w-4 text-gray-500" />
                    <span>{id.user.email || "/"}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <MdLocalPhone className="h-4 w-4 text-gray-500" />
                    <span>{id.user.phone_number_1}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <MdLocationPin className="h-4 w-4 text-gray-500" />
                    <span>{id.user.wilaya || "/"}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <FaUserAlt className="h-4 w-4 text-gray-500" />
                    <span>{id.user.username}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="h-px w-full bg-gray-200 my-4"></div> */}
          <form onSubmit={(event) => onEvent(id.user.id, event)} className='flex flex-col gap-10'>
            <select name="code" onChange={(e) => handleGroup({ wilaya: e.target.value })} className='border-b outline-none py-2 pl-1 focus:border-slate-950'>
              <option value="">Sélection par Wilaya</option>
              {Wilaya.map(pre => {
                if (pre != null) {
                  return (
                    <option key={pre.id} value={pre.code}>{pre.code} - {pre.name}</option>
                  )
                }
              })}
            </select>
            <input type="text" name='wilaya' readOnly value={city !== null ? String(findCityByCode(city)) : ''} className='hidden' />
            {loading &&
              <div className={`${loading ? '' : 'hidden'} bg-forth bg-opacity-50 text-xl flex justify-center items-center gap-3`}>
                <TbLoader3 className="animate-spin text-2xl" /> Loading ...
              </div>
            }
            {group &&
              <select name="group" className='border-b outline-none py-2 pl-7 focus:border-slate-950'>
                <option value="">Sélection Groupe</option>
                {group.map(pre => {
                  if (pre != null) {
                    return (
                      <option key={pre.groupe} value={pre.groupe}>{pre.groupe_name || pre.groupe}</option>
                    )
                  }
                })}
              </select>
            }
            <div className=" flex justify-end gap-2">
              <button
                type="button"
                onClick={() => onClose(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
            </div>
          </form>
        </div>
      </div >
    </div >
  )
}
