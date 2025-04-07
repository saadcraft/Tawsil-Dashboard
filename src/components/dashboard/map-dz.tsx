import React, { useState } from 'react'
import { getGroup } from '@/lib/gestion_action'
import { Wilaya, City } from '@/lib/tools/named'
import Algeria from '@/lib/tools/map/Algeria'

export default function MapDz() {

    const [chef, setChef] = useState<{ wilaya: string, code: string, chefs: number } | null>(null)

    const viewStat = async (wilaya: City) => {
        try {
            const data = await getGroup({ wilaya: wilaya.id })
            setChef({
                wilaya: wilaya.name,
                code: wilaya.id,
                chefs: data.data.length
            })
        } catch {
            setChef(null)
        }
    }

    return (
        <div className='relative w-full mx-auto px-3 py-5 border flex justify-center rounded-2xl bg-white shadow-lg'>
            <Algeria strokeColor='#000' hoverColor="#10b8eb" selectColor='blue' type='select-single' onSelect={(state) => viewStat(Wilaya.find((stat) => stat.name === state) as City)} />

            {chef &&
                <div onClick={() => setChef(null)} className='absolute top-0 left-0 bg-slate-50 px-2 text-sm md:text-lg py-2 rounded-lg shadow-lg cursor-pointer'>
                    <p>{chef.wilaya} {chef.code}</p>
                    <p>Partener: {chef.chefs}</p>
                </div>
            }
        </div>
    )
}
