// "use client"

// import { useState } from "react";
import MapGl from "../options/map_mark";

export default function ShowMap({ local, onSub }: { local: number[], onSub: ({ latitude, longitude }: { latitude: number, longitude: number }) => void }) {
    // const [coordinates, setCoordinates] = useState<{ lng: number; lat: number } | null>(null)

    // const handleMapClick = (lng: number, lat: number) => {
    //     setCoordinates({ lng, lat })
    // }

    return (
        <div className='fixed z-20 top-20 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='relative max-w-5xl h-full mx-auto w-full rounded-xl p-5 bg-white'>
                {/* <h1 className='font-semibold text-2xl'>Map</h1> */}
                <div>
                    <MapGl localisation={local} onSub={onSub} />
                </div>
                {/* <div className={`${isLoading ? '' : 'hidden'} absolute top-0 left-0 right-0 bottom-0 bg-forth bg-opacity-50 text-xl flex justify-center items-center gap-3`}>
                    <TbLoader3 className="animate-spin text-2xl" /> Loading ...
                </div> */}
            </div>
        </div>

    )
}