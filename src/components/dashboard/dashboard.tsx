"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import getMagasin from '@/lib/stores_api';
import { userInformation } from '@/lib/tools/store/web_socket'
import LoadingFirst from '../loading'

import Satistic from './statistic'
import Chart from './chart';
import MapDz from './map-dz';
import MagasinSection from './magasin-section';



export default function Dashboard({ data }: { data: Context | null }) {

  const [magasin, setMagasin] = useState<Magasin | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const { user } = userInformation();



  // Fetch magasin on client side if user is a partener
  useEffect(() => {
    const fetchMagasin = async () => {
      if (user?.role === "partener") {
        const fetchedMagasin = await getMagasin();
        if (!fetchedMagasin) {
          setIsLoading(false); // This should be handled client-side, you might need a different approach here.
        } else {
          setMagasin(fetchedMagasin);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchMagasin();
  }, [user]);


  // console.log(magasin)


  return (
    <div className="flex flex-col items-center justify-between">
      {user?.role == "gestion_commercial" || user?.role == "admin" ?
        <div className='w-full'>
          <div className='py-5 px-5'>
            {/* <h1 className="text-2xl font-bold mb-5 text-gray-600">Tableau de bord</h1> */}
            <div className='grid grid-cols-1 w-full'>
              <Satistic data={data} />
            </div>
          </div>
          <div className={`py-5 px-2 sm:px-16`}>
            {user?.role == "admin" &&
              <div className=''>
                <Chart data={data} user={user} />
              </div>
            }
            <div className='mt-4'>
              <MapDz />
            </div>
          </div>
        </div>
        :
        user?.role == "partener" && !isLoading && magasin ?
          <MagasinSection magasin={magasin} />

          :

          user?.role === "centre_appel" ?
            <div className='relative w-full top-20 sm:top-10 mx-auto px-3 py-5 flex justify-center'>
              <MapDz />
            </div>
            :

            <div className='fixed bottom-0 top-0 right-0 left-0 md:left-80 flex items-center justify-center'>
              <Image height={300} width={300} src={`/dash.svg`} alt='' />
            </div>
      }
      {isLoading &&
        <LoadingFirst />
      }

    </div>
  )
}
