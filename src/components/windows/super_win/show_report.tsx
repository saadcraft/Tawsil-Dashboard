import React from 'react'

export default function DisplayReport({ message }: { message: string }) {
    return (
        <div className='fixed z-20 top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto rounded-xl p-5 mt-10 bg-white'>
                <h1 className='mb-5 text-center font-bold'>Rapport</h1>
                <p>{message}</p>
            </div>
        </div>
    )
}
