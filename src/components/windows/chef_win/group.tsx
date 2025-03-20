"use client"

import { Wilaya } from '@/lib/tools/named'
import React, { useState } from 'react'

export default function Group({ id, onEvent, all }: { id: number, onEvent: (id: number, event: React.FormEvent<HTMLFormElement>) => void, all: Users[] }) {

  const [city, setCity] = useState<number | null>(null)

  function findCityByCode(code: number) {
    const city = Wilaya.find(c => c.code === code);
    return city ? city.name : '';
  }

  return (
    <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
      <div className='max-w-5xl mx-auto p-5 mt-10 rounded-xl bg-white'>
        <h1 className='mb-5 font-bold text-xl text-center'>Regroupé</h1>
        <form onSubmit={(event) => onEvent(id, event)} className='flex flex-col gap-10'>
          <select name="code" onChange={(e) => setCity(Number(e.target.value) || null)} className='border-b outline-none py-2 pl-1 focus:border-slate-950'>
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
          {city &&
            <select name='group' className='border-b-2 p-2 outline-none hover:border-third cursor-pointer'>
              <option value="">Seléctionée groupe</option>
              {all.map((pre, index) => {
                if (city === pre.wilaya_code) {
                  return (
                    <option key={index} value={pre.groupe!}>{`group : ${pre.groupe} ${pre.wilaya}`}</option>
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
