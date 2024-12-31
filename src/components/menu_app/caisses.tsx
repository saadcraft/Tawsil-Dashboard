"use client"

import React, {useState} from 'react'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { CloseCasses, OpenCasses } from "@/lib/action_client"
import ValideCasses from "../windows/valide_casses"
import { MdClose } from "react-icons/md"
import { toast } from "react-hot-toast"

export default function Caisses({token}: {token : string}) {
  
    const [select, setSelect] = useState(Array(20).fill(false))
    const [Close , setClose] = useState<boolean>(false)
  
    const handleCheck = (index: Number) => {
      setSelect((prevExpanded) => prevExpanded.map((isChecked, i) => (i === index ? !isChecked : isChecked)));
    }
    const handleCheckAll = () => {
      // Check if all items are selected
      const allSelected = select.every((isChecked) => isChecked);
  
      // If all selected, unselect all, otherwise select all
      setSelect(select.map(() => !allSelected));
    };

    const handleWindow = () => {setClose(pre => !pre)}

    const handleClose = async (value: string) => {

      const loadingToastId = toast.loading('Opening casse...');

      try {
        const result = await CloseCasses({ access: token, prix: value })

        if (result) {
          toast.success("Caisse closed successfully!", { id: loadingToastId });
        } else {
          toast.error("Failed to close casse. Please try again.", { id: loadingToastId });
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message, { id: loadingToastId });
        } else {
          toast.error("An unknown error occurred.", { id: loadingToastId });
        }
      }
    }

    const handleOpen = async () => {
      const loadingToastId = toast.loading('Closing casse...');
      try{
        const result = await OpenCasses({ access: token })
        if (result) {
          toast.success("Caisse opened successfully!" , { id: loadingToastId });
        } else {
          toast.error("Caisse is already opened." , { id: loadingToastId });
        }
      } catch (error) {
        toast.error("Error: Network problem or unexpected issue." , { id: loadingToastId });
      }

    }



  return (
    <div className='py-5 px-5 sm:px-16'>
      <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
        <Link href="/role" className='font-semibold text-third'>Dashboard /</Link>
        <h1 className='font-bold'>Les caisses</h1>
      </div>
      <div className='p-10 bg-white gap-10 rounded-md shadow-md'>
        <div className='mb-7 flex justify-between items-center'>
          <FaSearch className='absolute text-slate-500' />
          <input type="text" name="search" placeholder='Search to table' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
          <div className='flex justify-end gap-2'>
          <div className='p-2'>
            <button onClick={handleWindow} className='bg-red-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Close Caisse</button>
          </div>
          <div className='p-2'>
            <button onClick={handleOpen}  className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>Open Caisse</button>
          </div>
        </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-primer">
              <tr>
                <th className="px-6 py-3">
                  <input type="checkbox" name='check' id="check" onChange={handleCheckAll} checked={select.every(Boolean)} />
                </th>
                <th className="px-6 py-3">
                  Employé
                </th>
                <th className="px-6 py-3">
                  Client
                </th>
                <th className="px-6 py-3">
                  action
                </th>
                <th className="px-6 py-3">
                  id
                </th>
                <th className="px-6 py-3 text-right">
                  payé
                </th>
              </tr>
            </thead>
            <tbody className='odd:bg-six even:bg-fifth'>
            </tbody>
          </table>
        </div>
      </div>
      {Close ?
            <div>
              <button onClick={handleWindow} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
              <ValideCasses onEvent={handleClose} />
            </div>
      : ""}
    </div>
  )
}