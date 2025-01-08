import React from 'react'
import Link from 'next/link'
import { MdKeyboardArrowRight } from "react-icons/md";

type props = {
    url: string;
    title: string;
    icon: React.ReactNode;
    onEvent: () => void;
}


export function MenuParams({ url, title, icon, onEvent }: props) {
    return (
        <Link onClick={onEvent} href={url} className='flex justify-between p-3 items-center font-bold hover:bg-slate-600 text-xl cursor-pointer'>
            <h1 className='flex items-center gap-2'>{icon} {title}</h1>
            <MdKeyboardArrowRight />
        </Link>
    )
}