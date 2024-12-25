"use client";

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  return (
    <header className="fixed top-0 z-30 w-full bg-white  bg-gradient-to-r from-primer to-second shadow-md">
        <div className="py-2 px-4 text-white mx-auto flex justify-between items-center">
            <Image src="/tawsil.png" className="w-16 ml-10 cursor-pointer" alt="Tawsil" width={100} height={100} />
            <div className='flex items-center space-x-4'>
                <Link href="/login" className='bg-blue-600 hover:bg-third text-xl px-5 py-2 font-bold rounded-md flex gap-4 items-center'><FaRegUser /> Account</Link>
            </div>
        </div>
    </header>
  )
}
