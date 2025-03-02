import { UpdatePertunair } from '@/lib/stores_api';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
// import { Loader } from '@googlemaps/js-api-loader';
import { useRouter } from 'next/navigation';

export default function AddGeo({ onEvent }: { onEvent: (value: null) => void }) {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const router = useRouter()

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);

                    // const geocoder = new window.google.maps.Geocoder();
                },
                () => {
                    toast.error('You have no permission.'); // Show an error message
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const formObject = Object.fromEntries(formData.entries())

        const isEmpty = Object.values(formObject).some((value) => !value);

        if (isEmpty) {
            toast.error('appuyez sur click pour Définir la localisation.'); // Show an error message
            return; // Stop further execution
        }

        const res = await UpdatePertunair({ long: longitude!, lat: latitude! })

        if (res) {
            router.refresh();
            onEvent(null)
        }

    }


    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto p-5 mt-10 rounded-xl bg-white'>
                <h1 className='mb-5 font-bold text-xl text-center'>Définir la localisation</h1>
                <button onClick={handleGetLocation} className='p-2 mb-2 bg-third w-full text-white font-bold rounded-lg hover:bg-opacity-60'>Cliquez</button>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <input type='text' readOnly name='latitude' placeholder='Latitude' value={latitude || ""} className='p-2 rounded-lg' />
                    <input type='text' readOnly name='longitude' placeholder='Longitude' value={longitude || ""} className='p-2 rounded-lg' />
                    <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
                </form>
            </div>
        </div>
    )
}