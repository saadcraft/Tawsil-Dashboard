import React from 'react'
import { TbLoader3 } from 'react-icons/tb'

export default function LoadingFirst() {
    return (
        <div className='fixed w-full h-full z-50 top-0 left-0 bg-opacity-50 bg-slate-400 flex items-center justify-center'>
            <h1 className="text-2xl flex items-center gap-5">
                Loading... <TbLoader3 className="animate-spin text-4xl" />
            </h1>
        </div>
    )
}
