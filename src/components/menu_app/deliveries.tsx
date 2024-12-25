import Link from 'next/link'
import React from 'react'

export default function Delivery() {
  return (
    <div className='py-5 px-5 sm:px-16'>
        <div className='flex items-center gap-2 px-5 pb-5'>
            <Link href="/role" className='font-semibold text-xl'>Dashboard /</Link>
            <h1 className='font-bold text-xl'>Livraisons</h1>
        </div>
        <div className='p-10 bg-white grid xl:grid-cols-2 gap-10 rounded-md shadow-md'>
            
        </div>
    </div>
  )
}