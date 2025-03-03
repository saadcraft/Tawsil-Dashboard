import React, { useState } from 'react'
import toast from 'react-hot-toast';
// import { Loader } from '@googlemaps/js-api-loader';
import { useRouter } from 'next/navigation';
import { Wilaya } from '@/lib/tools/named';
import { modifyGeo } from '@/lib/super_action';

export default function ModifieGeo({ id, onEvent }: { id: number, onEvent: (value: null) => void }) {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [code, setCode] = useState<number | null>(null)

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

        const city = formData.get("wilaya") as string
        const num = formData.get("wilaya_code") as string

        if (isEmpty) {
            toast.error('appuyez sur click pour Définir la localisation.'); // Show an error message
            return; // Stop further execution
        }


        console.log({ id: id, long: longitude!, lat: latitude!, wilaya: city, wilaya_code: Number(num) })

        const res = await modifyGeo({ id: id, long: longitude!, lat: latitude!, wilaya: city, wilaya_code: Number(num) })

        if (res) {
            router.refresh();
            onEvent(null)
        }

    }

    const handleWilayaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedWilayaName = event.target.value; // Get the selected wilaya name
        const selectedWilaya = Wilaya.find(wilaya => wilaya.name === selectedWilayaName); // Find the wilaya object
        if (selectedWilaya) {
            setCode(selectedWilaya.code); // Update the code state with the wilaya's id
        } else {
            setCode(null); // Reset code if no valid selection
        }
    };


    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='sm:max-w-xl w-full mx-auto p-5 mt-10 rounded-xl bg-white'>
                <h1 className='mb-5 font-bold text-xl text-center'>Définir la localisation</h1>
                <button onClick={handleGetLocation} className='p-2 mb-2 bg-third w-full text-white font-bold rounded-lg hover:bg-opacity-60'>Cliquez</button>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div className='flex gap-2 flex-col sm:flex-row'>
                        <input type='text' readOnly name='latitude' placeholder='Latitude' value={latitude || ""} className='p-2 w-full border rounded-lg' />
                        <input type='text' readOnly name='longitude' placeholder='Longitude' value={longitude || ""} className='p-2 border w-full  rounded-lg' />
                    </div>
                    <p>Wilaya:</p>
                    <select name='wilaya' onChange={handleWilayaChange} className='border-b outline-none py-2 pl-7 focus:border-slate-950' >
                        <option value="">Selectioné wilaya</option>
                        {Wilaya.map(pre => {
                            return (
                                <option key={pre.id} value={pre.name}>{pre.id} - {pre.name}</option>
                            )
                        })}
                    </select>
                    <input type='text' readOnly name='wilaya_code' placeholder='code wilaya' value={code || ""} className='p-2 border  rounded-lg' />
                    <button className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Submite</button>
                </form>
            </div>
        </div>
    )
}