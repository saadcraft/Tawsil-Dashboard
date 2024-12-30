"use client"

import React, {useState} from 'react'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { Partner } from "@/lib/type_module/center_type"
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md"
import Comment from "../windows/comment"

type Props = {
  parteners: Partner[];
};

export default function AppleCenter({ parteners } : Props) {

  const [activePartnerId, setActivePartnerId] = useState<number | null>(null);

  const handleCommentClick = (id: number) => {
    setActivePartnerId(activePartnerId === id ? null : id); // Toggle visibility
  };

  const handleClose = () => {setActivePartnerId(null)}
  
    const pertener = parteners.map((pre, index) => {
      return (
        <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
        <td className="px-6 py-4">
          {pre.id}
        </td>
        <td className="px-6 py-4">
          {pre.user.username}
        </td>
        <td className="px-6 py-4">
          {pre.user.phone_number_1}
        </td>
        <td className="px-6 py-4">
          {pre.user.is_active ? "true" : "false"}
        </td>
        <td className="px-6 py-4 text-center">
          <button className='text-xl'><IoDocumentTextOutline /></button>
        </td>
        <td className="px-6 py-4 text-right">
            <button onClick={() => handleCommentClick(pre.id)} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Comment</button>
        </td>
      </tr>
      )
    })


  return (
    <div className='py-5 px-5 sm:px-16'>
      <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
        <Link href="/role" className='font-semibold text-third'>Dashboard /</Link>
        <h1 className='font-bold'>Centre d'appel</h1>
      </div>
      <div className='p-10 bg-white gap-10 rounded-md shadow-md'>
        <div className='mb-7 flex justify-between items-center'>
          <FaSearch className='absolute text-slate-500' />
          <input type="text" name="search" placeholder='Search to table' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
            <button  className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Add comment</button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-primer">
              <tr>
                <th className="px-6 py-3">
                  ID
                </th>
                <th className="px-6 py-3">
                  Partner
                </th>
                <th className="px-6 py-3">
                  Number
                </th>
                <th className="px-6 py-3">
                  action
                </th>
                <th className="px-6 py-3 text-right">
                  commentaire
                </th>
                <th className="px-6 py-3 text-right">
                  commenter
                </th>
              </tr>
            </thead>
            <tbody className='odd:bg-six even:bg-fifth'>
              {pertener}
            </tbody>
          </table>
        </div>
      </div>
      {activePartnerId !== null && (
        <div>
          <button onClick={handleClose} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
          <Comment id={activePartnerId} />
        </div>
      )}
    </div>
  )
}
