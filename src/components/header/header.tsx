"use client";

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaRegUser } from "react-icons/fa";
import Named from '@/lib/tools/named';

export default function Header({ user }: { user: Users }) {

  return (
    <header className="fixed top-0 z-30 w-full bg-white  bg-gradient-to-r from-primer to-second shadow-md">
      <div className="py-2 px-4 text-white mx-auto flex justify-between items-center">
        <Image src="/tawsil.png" className="w-16 ml-10 cursor-pointer" alt="Tawsil" width={100} height={100} />
        <div className='flex items-center space-x-4'>
          {user ?
            <Link href="/dashboard/profile" className='px-5 py-2 rounded-md flex gap-4 items-center'>
              <FaRegUser className='md:text-4xl text-2xl' />
              <span className='flex flex-col md:gap-1.5 text-sm'>
                <p>{user.username}</p>
                <p>{Named(user.role)}</p>
              </span>
            </Link>
            : <Link href="/login" className='px-5 py-2 rounded-md flex gap-2 items-center'><FaRegUser className='text-xl' />Compte</Link>}
        </div>
      </div>
    </header>
  )
}
