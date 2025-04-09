"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import {
  MdOutlineFileUpload,
  MdModeEditOutline,
  MdClose,
  MdOutlineStar,
  MdOutlineEdit
} from "react-icons/md";
import getMagasin, { UpdateMagasin } from '@/lib/stores_api';
import toast from 'react-hot-toast';
import PictureMagasin from '../windows/dashboard_win/upload_win'
import ModifieMagasin from '../windows/magasin_win/modifie_magasin'
import { userInformation } from '@/lib/tools/store/web_socket'
import LoadingFirst from '../loading'
import AddGeo from '../windows/magasin_win/add_geolocation'
import GlobleComment from '../windows/magasin_win/globle_comment'


import QRcode from '../windows/magasin_win/qrcode';
import Satistic from './statistic'
import Chart from './chart';
import MapDz from './map-dz';



export default function Dashboard({ data, dataStatic, vtcStatic }: { data: Context | null, dataStatic: Chart[], vtcStatic: Chart[] }) {

  const router = useRouter()

  const [types, setTypes] = useState<"background" | "profile" | null>(null)
  const [mody, setMody] = useState<boolean>(false)
  const [magasin, setMagasin] = useState<Magasin | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [geo, setGeo] = useState<boolean>(false)
  const [review, setReview] = useState<number | null>(null)
  const [qrCode, setQrCode] = useState<number | null>(null)


  const { user } = userInformation()

  // console.log(data, staticData)

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




  const handleStatusChange = async (magasin_id: number, EtatOuverture: boolean) => {
    const loadingToastId = toast.loading('Submite update...');

    const updateStatus = await UpdateMagasin({ magasin_id, EtatOuverture })

    if (updateStatus.code == 200) {
      toast.success(EtatOuverture ? "Ouvert" : "Fermé", { id: loadingToastId });
      router.refresh();
    } else {
      toast.error(updateStatus, { id: loadingToastId });
    }
  }


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
                <Chart data={data} staticLiv={dataStatic} staticVtc={vtcStatic} />
              </div>
            }
            <div className='mt-4'>
              <MapDz />
            </div>
          </div>
        </div>
        :
        user?.role == "partener" && !isLoading && magasin ?
          <div className='w-full'>
            <div className='relative w-full'>
              <div className='w-full h-52 overflow-hidden'>
                {magasin?.image_background ?
                  <Image width={500} height={500} src={`${process.env.IMGS_DOMAIN}${magasin.image_background}`} alt='image cover' className='object-cover w-full h-full' />
                  :
                  <Image width={500} height={500} src="/placeholder.svg" alt='image cover' className='object-cover w-full h-full' />
                }
              </div>
              <div className='absolute left-12 top-36 md:top-24'>
                {magasin?.image ?
                  <Image width={150} height={150} src={`${process.env.IMGS_DOMAIN}${magasin.image}`} alt="image profile" className=' w-24 h-24 md:w-36 md:h-36 border-2 border-[#10c5f1] rounded-full object-cover bg-white shadow-md' />
                  :
                  <Image width={150} height={150} src={`/placeholder.svg`} alt="image profile" className=' w-24 h-24 md:w-36 md:h-36 border-2 border-[#10c5f1] rounded-full bg-white shadow-md' />
                }
                <span onClick={() => setTypes("profile")} className='absolute right-3 bottom-1 md:text-3xl text-2xl text-gray-600 bg-slate-200 rounded-full drop-shadow-lg cursor-pointer'>
                  <MdOutlineFileUpload />
                </span>
              </div>
              <span onClick={() => setTypes("background")} className='absolute text-3xl text-gray-800 right-3 top-3 bg-slate-400 bg-opacity-50 rounded-full p-1 cursor-pointer hover:bg-opacity-60 hover:text-gray-900'>
                <MdModeEditOutline />
              </span>
              <div className='absolute md:top-36 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bottom-2 md:left-52 left-40 text-white md:flex items-center'>
                <p className=' bg-slate-600 p-2 rounded-xl bg-opacity-30 font-bold md:text-3xl text-md'>{magasin?.name}</p>
                <span onClick={() => setReview(1)} className='md:h-10 cursor-pointer flex gap-0.5 font-bold bg-slate-600 bg-opacity-30 items-center justify-center text-center border-2 px-1 hover:border-gold6 rounded-lg'>{magasin?.rating} <MdOutlineStar className='text-lg text-gold6' /></span>
              </div>
            </div>
            <div className='relative'>
              <div className="absolute md:right-20 right-5 top-3 flex items-center space-x-3">
                <span className="font-bold">Status:</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={magasin?.EtatOuverture || false} // Set from database
                    onChange={(e) => magasin?.id !== undefined && handleStatusChange(magasin.id, e.target.checked)} // Function to update status
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {magasin?.EtatOuverture ?
                      <span className='text-green-700 font-bold'>Ouvert</span>
                      :
                      <span className='text-red-700 font-bold'>Farmé</span>
                    }
                  </span>
                </label>
              </div>
            </div>
            <div className='py-5 px-5 sm:px-16'>
              <div className='relative top-10 p-3 bg-white md:p-10 rounded-md shadow-md'>
                <div className="p-5 border border-gray-200 rounded-2xl lg:p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                        Informations
                      </h4>

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500">
                            Address
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {magasin?.address || "/"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500">
                            Télephone
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {magasin?.contact || "/"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500">
                            Wilaya
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {magasin?.wilaya || "/"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500">
                            Discreption
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {magasin?.descprition || "/"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500">
                            Categologe
                          </p>
                          <p className="text-sm font-medium text-gray-800 flex flex-wrap gap-2">
                            {magasin?.cataloguqe?.map((category) => (
                              <span key={category.id} className="rounded-full font-semibold bg-slate-300  px-3 py-1 text-sm text-primary">
                                {category.name}
                              </span>
                            ))}
                          </p>
                        </div>

                        {/* <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Wilaya
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {user.wilaya}
                          </p>
                        </div> */}

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500">
                            Location
                          </p>
                          <div className="text-sm font-medium text-gray-800">
                            {magasin.owner.longitude && magasin.owner.longitude ?
                              <div className="mapouter">
                                <div className="gmap_canvas">
                                  <iframe
                                    className="gmap_iframe"
                                    width="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                    src={`https://maps.google.com/maps?width=200&height=150&hl=en&q=${magasin.owner.latitude},${magasin.owner.longitude}&t=&z=13&ie=UTF8&iwloc=B&output=embed`}
                                    title="Google Map"
                                  ></iframe>
                                  <a href="https://sprunkin.com/">Sprunki Game</a>
                                </div>
                              </div>
                              :
                              <div className='flex items-center gap-3'>
                                <p className='text-red-600'>Localisation didn&apos;t exist</p>
                                <span onClick={() => setGeo(true)} className='bg-gray-200 p-1 rounded-full hover:bg-gray-400 cursor-pointer hover:text-white'>
                                  <MdModeEditOutline />
                                </span>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => setQrCode(magasin.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto"
                      >
                        QRcode
                      </button>
                      <button
                        onClick={() => setMody(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto"
                      >

                        <MdOutlineEdit className=' text-xl' />
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
      {types &&
        <>
          <button onClick={() => setTypes(null)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
          <PictureMagasin onsub={setTypes} type={types} maga={magasin} />
        </>
      }
      {mody &&
        <>
          <button onClick={() => setMody(false)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
          <ModifieMagasin maga={magasin!} onsub={setMody} />
        </>
      }
      {isLoading &&
        <LoadingFirst />
      }
      {geo &&
        <>
          <button onClick={() => setGeo(false)} className='fixed z-50 top-20 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
          <AddGeo onEvent={setGeo} />
        </>
      }
      {review &&
        <div>
          <button onClick={() => setReview(null)} className='fixed z-50 top-28 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
          <GlobleComment comment={review} />
        </div>
      }
      {qrCode &&
        <div>
          <button onClick={() => setQrCode(null)} className='fixed z-50 top-28 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
          <QRcode id={qrCode} />
        </div>
      }
    </div>
  )
}
