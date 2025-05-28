"use client"

import React, { useState } from 'react'
import toast from 'react-hot-toast';
// import { Loader } from '@googlemaps/js-api-loader';
import { useRouter } from 'next/navigation';
import { modifyGeo } from '@/lib/super_action';
import { getCity } from '@/lib/tutorial_api';
import { TbLoader3 } from 'react-icons/tb';
import ShowMap from '../map_dialogue';

export default function AddGeo({ id, onEvent }: { id: number, onEvent: (value: false) => void }) {
    const [city, setCity] = useState<string | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isManual, setIsManual] = useState<number[] | null>(null)

    // console.log("id is :", id)

    const router = useRouter()

    const handleManualLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);

                    setIsManual([longitude, latitude])

                    // const geocoder = new window.google.maps.Geocoder();

                    // const city = await getCity({ latitude, longitude })

                    // if (city) {
                    //     setCity(city.city);
                    //     // setCode(city.code);
                    //     setIsLoading(true)
                    // }
                },
                () => {
                    toast.error('You have no permission.'); // Show an error message
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);

                    // const geocoder = new window.google.maps.Geocoder();

                    const city = await getCity({ latitude, longitude })

                    if (city) {
                        setCity(city.city);
                        // setCode(city.code);
                        setIsLoading(true)
                    }
                },
                () => {
                    toast.error('You have no permission.'); // Show an error message
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    };

    const handleManual = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
        console.log("here", latitude, longitude)
        try {
            setLatitude(latitude);
            setLongitude(longitude);
            setIsManual(null)
            setIsLoading(false)
            const city = await getCity({ latitude, longitude })
            if (city) {
                toast.success('configuration terminée .');
                setCity(city.city);

                // setCode(city.code);
                setIsLoading(true)
            }
        } catch {
            toast.error('Problem connection.');
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const formObject = Object.fromEntries(formData.entries())

        const isEmpty = Object.values(formObject).some((value) => !value);

        if (isEmpty) {
            toast.error('appuyez sur click pour Définir la localisation.'); // Show an error message
            return; // Stop further execution
        }

        const res = await modifyGeo({ id: id, long: longitude!, lat: latitude!, wilaya: city! });

        if (res) {
            router.refresh();
            onEvent(false)
        }

    }


    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto p-5 mt-10 rounded-xl bg-white'>
                <h1 className='mb-5 font-bold text-xl text-center'>Définir la localisation</h1>
                <div className='flex gap-2'>
                    <button onClick={handleGetLocation} className='p-2 mb-2 bg-third w-full text-white font-bold rounded-lg hover:bg-opacity-60'>auto</button>
                    <button onClick={handleManualLocation} className='p-2 mb-2 bg-third w-full text-white font-bold rounded-lg hover:bg-opacity-60'>manual</button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div className='flex gap-2 flex-col sm:flex-row'>
                        <input type='text' readOnly name='latitude' placeholder='Latitude' value={latitude || ""} className='p-2 w-full border rounded-lg' />
                        <input type='text' readOnly name='longitude' placeholder='Longitude' value={longitude || ""} className='p-2 border w-full  rounded-lg' />
                    </div>
                    <div className='flex gap-2 flex-col sm:flex-row'>
                        <input type='text' readOnly name='wilaya' placeholder='Wilaya' value={city || ""} className='p-2 w-full border rounded-lg' />
                    </div>
                    <button disabled={!isLoading} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>
                        {isLoading ?
                            "Submite"
                            :
                            <div className={` bg-forth bg-opacity-50 text-xl flex justify-center items-center gap-3`}>
                                <TbLoader3 className="animate-spin text-2xl" /> En attent ...
                            </div>

                        }
                    </button>
                </form>
            </div>
            {isManual &&
                <ShowMap local={isManual} onSub={handleManual} />
            }
        </div>
    )
}