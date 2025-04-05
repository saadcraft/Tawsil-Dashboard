import React from 'react'
import { TbLoader3 } from 'react-icons/tb'

export default function LoadingFirst() {
    return (
        // <div className='fixed w-full h-full z-50 top-0 left-0 bg-opacity-50 bg-slate-400 flex items-center justify-center'>
        //     <h1 className="text-2xl flex items-center gap-5">
        //         Loading... <TbLoader3 className="animate-spin text-4xl" />
        //     </h1>
        // </div>
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-4">
                    Loading...
                    <TbLoader3 className="animate-spin text-4xl text-blue-600" />
                </h1>
                {/* <div className="mt-6 h-2 w-48 bg-gray-200 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
                </div> */}
            </div>
        </div>
    )
}
