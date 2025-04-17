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
            <p className='absolute right-3 top-2 lg:right-auto font-bold text-2xl text-gray-600'>Partenaires</p>
            <div className='mt-5 w-full mx-auto px-3 py-5 flex justify-center'>
                <Algeria strokeColor='#000' hoverColor="#10b8eb" selectColor='blue' type='select-single' onSelect={(state) => viewStat(Wilaya.find((stat) => stat.name === state) as City)} />
            </div>
            <div onClick={() => setChef(null)} className='absolute top-0 left-0 bg-slate-50 px-2 text-sm md:text-lg py-2 rounded-lg shadow-lg cursor-pointer'>
                {chef ?
                    <>
                        <p>{chef.wilaya} {chef.code}</p>
                        <p>Partener: {chef.chefs}</p>
                    </>
                    :
                    <p>Cliquez sur wilaya</p>
                }
            </div>
        </div>
    )
}

export function MapGoogle({ latitude, longitude }: { latitude: string, longitude: string }) {
    return (
        <div className="mapouter">
            <div className="gmap_canvas">
                <iframe
                    className="gmap_iframe"
                    width="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://maps.google.com/maps?width=200&height=150&hl=en&q=${latitude},${longitude}&t=&z=13&ie=UTF8&iwloc=B&output=embed`}
                    title="Google Map"
                ></iframe>
                <a href="https://sprunkin.com/">Sprunki Game</a>
            </div>
        </div>
    )
}
