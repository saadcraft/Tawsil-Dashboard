"use client"

import { toast } from 'react-hot-toast'
import React, { useState } from 'react'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { FaCommentDots, FaUserGroup } from "react-icons/fa6";
import { MdClose } from "react-icons/md"
import Comment from "../windows/chef_win/comment"
import { AddComment, UpdateGroup } from '@/lib/call_action'
import ShowComment from '../windows/chef_win/show-comments'
import Group from '../windows/chef_win/group'
import { useRouter } from 'next/navigation'

type Props = {
  parteners: Partenaire[];
  chefs: Users[];
};

export default function AppleCenter({ parteners, chefs }: Props) {

  const router = useRouter()

  const [activePartnerId, setActivePartnerId] = useState<number | null>(null);
  const [showComment, setshowComment] = useState<number | null>(null);
  const [resomble, setResomble] = useState<number>(0);

  const handleCommentClick = (id: number) => {
    setActivePartnerId(activePartnerId === id ? null : id); // Toggle visibility
  };

  const handleShowClick = (id: number) => {
    setshowComment(showComment === id ? null : id); // Toggle visibility
  };

  const hundleClick = async (id: number, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loadingToastId = toast.loading('Submite Commante...');
    const formData = new FormData(event.currentTarget);
    const add = formData.get('comment') as string;
    try {
      const res = await AddComment({ id: id, comment: add })
      if (res) {
        toast.success('Comment added Succesfully', { id: loadingToastId });
        setActivePartnerId(null)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: loadingToastId });
      } else {
        toast.error('An unknown error occurred', { id: loadingToastId });
      }
    }
  }

  const hundleGroup = async (id: number, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loadingToastId = toast.loading('Submite Commande...');
    const formData = new FormData(event.currentTarget);
    const add = formData.get('group') as string;
    try {
      const res = await UpdateGroup({ id: id, groupe: add })
      if (res) {
        toast.success('Comment added Succesfully', { id: loadingToastId });
        setResomble(0)
        router.refresh()
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: loadingToastId });
      } else {
        toast.error('An unknown error occurred', { id: loadingToastId });
      }
    }
  }

  const handleClose = () => { setActivePartnerId(null) }
  const handleShowClose = () => { setshowComment(null) }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cleint = formData.get('client') as string;
    router.push(`?search=${cleint}`);
  }

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
          {pre.user.groupe ? pre.user.groupe :
            <>
              <button onClick={() => setResomble(pre.user.id)} className='text-xl'><FaUserGroup /></button>
            </>
          }
        </td>
        <td className="px-6 py-4 text-center">
          <button onClick={() => handleShowClick(pre.id)} className='text-xl'><FaCommentDots /></button>
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
        <h1 className='font-bold'>{`Centre d'appel`}</h1>
      </div>
      <div className='p-10 pb-20 bg-white gap-10 rounded-md shadow-md'>
        <form onSubmit={handleSearch} className='mb-7 flex items-center gap-2'>
          <FaSearch className='absolute text-slate-500' />
          <input type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
          <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherch</button>
        </form>
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
                  Action
                </th>
                <th className="px-6 py-3 text-center">
                  Groupe
                </th>
                <th className="px-6 py-3 text-center">
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
          <Comment onEvent={hundleClick} id={activePartnerId} />
        </div>
      )}
      {showComment !== null && (
        <div>
          <button onClick={handleShowClose} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
          <ShowComment id={showComment} />
        </div>
      )}
      {resomble > 0 && (
        <div>
          <button onClick={() => setResomble(0)} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
          <Group id={resomble} onEvent={hundleGroup} all={chefs} />
        </div>
      )}
    </div>
  )
}
