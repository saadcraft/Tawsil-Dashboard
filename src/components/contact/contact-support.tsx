"use client"

import React, { useState } from 'react'
import { BsHeadset } from "react-icons/bs";

export default function ContactSupport() {

    const [apeare, setApeare] = useState<boolean>(false)

    return (
        <div className='fixed z-10 bottom-3 right-3'>
            <div className={`absolute bottom-20 right-0 p-2 transition-all bg-white shadow-md rounded-md ${apeare ? " " : "translate-x-96"}`}>
                <div className='relative z-10 w-full flex flex-col gap-2'>
                    <input type='text' name="object" className='border rounded-md p-1' placeholder="Entre L'object" />
                    <textarea name="body" className='border rounded-md w-full p-1' placeholder='Entre le message' />
                    <button className='p-1 bg-third hover:bg-blue-700 text-white w-full font-bold rounded-xl'>Envoyer</button>
                </div>
                <span className='absolute z-0 right-4 -bottom-3 p-3 rotate-45 shadow-md bg-white'></span>
            </div>
            <div onClick={() => setApeare(!apeare)} className='p-2 rounded-full cursor-pointer bg-primer'>
                <BsHeadset className='text-3xl text-white' />
                <div className='absolute p-0.5 rounded-full bg-six left-0 -bottom-1'>
                    <div className='bg-green-600 w-3 h-3 rounded-full'></div>
                </div>
            </div>
        </div>
    )
}
