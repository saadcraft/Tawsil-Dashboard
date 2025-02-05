import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

type props = {
    title: string;
    icon: React.ReactNode;
    onEvent: () => void;
}


export function MenuParams({ title, icon, onEvent }: props) {
    return (
        <div onClick={onEvent} className='flex justify-between p-3 items-center font-bold hover:bg-slate-600 text-xl cursor-pointer'>
            <h1 className='flex items-center gap-2'>{icon} {title}</h1>
            <MdKeyboardArrowRight />
        </div>
    )
}