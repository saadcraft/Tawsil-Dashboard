"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaTrashAlt } from 'react-icons/fa'
import { FaCommentDots, FaUserGroup } from "react-icons/fa6";
import { MdClose, MdOutlineRefresh, MdBlock } from "react-icons/md"
import Comment from "../windows/centre_win/comment"
import { AddComment, UpdateGroup } from '@/lib/call_action'
import ShowComment from '../windows/centre_win/show-comments'
import Group from '../windows/chef_win/group'
import toast from 'react-hot-toast';
import { RiCheckFill } from 'react-icons/ri';
import { handleInputChange } from '@/lib/tools/tools';
import { useSearchLoader } from '../options/useSearchLoader';
import LoadingFirst from '../loading';
import DeleteReminder from '../windows/centre_win/block_user';
import { BlockUser } from '@/lib/auth';
import ShowCorbielle from '../windows/centre_win/show_user_blocker';

type Props = {
  parteners: Partenaire[];
  // chefs: Users[];
  refresh: () => void
};

export default function AppleCenter({ parteners, refresh }: Props) {

  const { isLoading, handleSearch } = useSearchLoader(['search', 'groupe']);

  const [activePartnerId, setActivePartnerId] = useState<number | null>(null);
  const [showComment, setshowComment] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [resomble, setResomble] = useState<Partenaire | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean,
    userId: number | null,
    userName: string
  }>({
    isOpen: false,
    userId: null,
    userName: "",
  })

  const openDeleteConfirmation = (id: number, name: string) => {
    setDeleteConfirmation({
      isOpen: true,
      userId: id,
      userName: name,
    })
  }

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      userId: null,
      userName: "",
    })
  }


  const handleCommentClick = (id: number) => {
    setActivePartnerId(activePartnerId === id ? null : id); // Toggle visibility
  };

  const handleShowClick = (id: number) => {
    setshowComment(showComment === id ? null : id); // Toggle visibility
  };

  const hundleClick = async (id: number, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const add = formData.get('comment') as string;
    const model = formData.get('model') as string;

    const comment = model ? model + `. \n` + add : add
    if (comment === "") {
      toast.error("si vous plaît ajouter une commentaire");
      return;
    }
    const res = await AddComment({ id: id, comment: comment })
    if (res) {
      setActivePartnerId(null)
      refresh()
    }
  }

  const hundleGroup = async (id: number, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const add = formData.get('group') as string;
    const wilaya = formData.get('wilaya') as string;
    const code = formData.get('code') as string;

    if (add === "" || wilaya === "" || code === "") {
      toast.error("Informations incomplétes");
      return null;
    }
    const res = await UpdateGroup({ id: id, groupe: add, wilaya: wilaya, code: code })
    if (res) {
      setResomble(null)
      refresh()
    }
  }

  const handleDelete = async (id: number) => {
    const loadingToastId = toast.loading("Supprimer en coure ...")
    const res = await BlockUser({ id })
    if (res) {
      toast.success("Utilisateur Supprimé", { id: loadingToastId })
      refresh()
      closeDeleteConfirmation()
    } else {
      toast.error("Problem de connection", { id: loadingToastId });
    }
  }

  const handleClose = () => { setActivePartnerId(null) }
  const handleShowClose = () => { setshowComment(null) }

  const pertener = parteners.map((pre, index) => {
    return (
      <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
        <td className="px-6 py-4">
          {pre.id}
        </td>
        <td className="px-6 py-4 max-w-52 text-wrap overflow-hidden">
          {pre.user.username}
        </td>
        <td className="px-6 py-4">
          {pre.user.phone_number_1}
        </td>
        <td className="px-6 py-4">
          {pre.user.is_active ? "true" : "false"}
        </td>
        <td className="px-6 py-4 text-center">
          {pre.user.groupe ?
            <div className='flex gap-3 justify-center'>
              {pre.user.groupe_name || pre.user.groupe}
              <button onClick={() => setResomble(pre)} className='text-2xl'><MdOutlineRefresh /></button>
            </div>

            :
            <>
              <button onClick={() => setResomble(pre)} className='text-2xl'><FaUserGroup /></button>
            </>
          }
        </td>
        <td className="relative px-6 py-4 text-center">
          <button onClick={() => handleShowClick(pre.id)}>
            {pre.pre_en_charge &&
              <div className='absolute top-3 bg-green-600 p-0.5 rounded-full ml-4'>
                <RiCheckFill className='text-white' />
              </div>
            }
            <FaCommentDots className='text-2xl' /></button>
        </td>
        <td className="px-6 py-4 text-right flex justify-end gap-1">
          <button onClick={() => handleCommentClick(pre.id)} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Comment</button>
          <button onClick={() => openDeleteConfirmation(pre.user.id, pre.user.username)} className='bg-red-600 disabled:bg-opacity-20 p-2 text-white rounded-lg font-semibold'><MdBlock size={15} /></button>
        </td>
      </tr>
    )
  })


  return (
    <div className='py-5 px-5 sm:px-16'>
      <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
        <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
        <h1 className='font-bold'>{`Centre d'appel`}</h1>
      </div>
      <div className='p-3 md:p-10 pb-20 md:pb-20 bg-white gap-10 rounded-md shadow-md'>
        <div className='mb-7 flex flex-col gap-2 md:flex-row justify-between items-center'>
          <form onSubmit={handleSearch} className='flex flex-col md:flex-row items-center gap-2'>
            <div className='relative'>
              <FaSearch className='absolute top-3 text-slate-500' />
              <input type="text" name="search" onChange={handleInputChange} placeholder='Recherche par numéro' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
            </div>
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <div className="relative">
                <input
                  type="radio"
                  id="confirmed"
                  name="groupe"
                  value="True"
                  defaultChecked
                  className="peer sr-only"
                />
                <label
                  htmlFor="confirmed"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-transparent rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:text-gray-900 peer-checked:bg-green-400 peer-checked:text-white peer-checked:shadow-sm"
                >
                  Groupé
                </label>
              </div>

              <div className="relative">
                <input
                  type="radio"
                  id="not-confirmed"
                  name="groupe"
                  value="False"
                  className="peer sr-only"
                />
                <label
                  htmlFor="not-confirmed"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-transparent rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:text-gray-900 peer-checked:bg-red-400 peer-checked:text-white peer-checked:shadow-sm"
                >
                  No groupé
                </label>
              </div>
            </div>
            <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherche</button>
          </form>
          <button onClick={() => setShowDetail(true)} className='bg-red-600 disabled:bg-opacity-20 px-4 py-2 text-right text-white rounded-lg font-semibold'><FaTrashAlt /></button>
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
                  Numero
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
          <button onClick={handleClose} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
          <Comment onEvent={hundleClick} id={activePartnerId} />
        </div>
      )}
      {showComment !== null && (
        <div>
          <button onClick={handleShowClose} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
          <ShowComment id={showComment} />
        </div>
      )}
      {resomble && (
        <div>
          <button onClick={() => setResomble(null)} className='fixed z-50 top-28 right-10 bg-white shadow-md rounded-full text-third p-2 font-bold text-4xl'><MdClose /></button>
          <Group id={resomble} onEvent={hundleGroup} onClose={setResomble} />
        </div>
      )}
      {deleteConfirmation.isOpen &&
        <DeleteReminder closeDelet={closeDeleteConfirmation} deleteConfirmation={deleteConfirmation} handleDelete={handleDelete} />
      }
      {showDetail &&
        <ShowCorbielle closeCorbiel={() => setShowDetail(false)} refresh={refresh} />
      }
      {isLoading &&
        <LoadingFirst />
      }
    </div>
  )
}
