"use client"

import { getGroup } from '@/lib/gestion_action'
import { Wilaya } from '@/lib/tools/named'
import React, { useState } from 'react'

export default function Group({ id, onEvent }: { id: number, onEvent: (id: number, event: React.FormEvent<HTMLFormElement>) => void }) {

  const [city, setCity] = useState<number | null>(null)
  const [group, setGroup] = useState<Groupes[] | null>(null)

  function findCityByCode(code: number) {
    const city = Wilaya.find(c => c.code === code);
    return city ? city.name : '';
  }

  const handleGroup = async ({ wilaya }: { wilaya: string }) => {
    setCity(Number(wilaya))
    try {
      const data = await getGroup({ wilaya })
      if (data.data.length > 0) {
        setGroup(data.data)
      } else {
        setGroup(null)
      }
    } catch {
      setGroup(null)
    }
  }

  return (
    <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
      <div className='max-w-5xl mx-auto p-5 mt-10 rounded-xl bg-white'>
        <h1 className='mb-5 font-bold text-xl text-center'>Regroupé</h1>
        <form onSubmit={(event) => onEvent(id, event)} className='flex flex-col gap-10'>
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
          <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
        </form>
      </div>
    </div>
  )
}
