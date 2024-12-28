"use client"

import React, {useState} from 'react'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'

export default function Caisses() {
  
    const [select, setSelect] = useState(Array(20).fill(false))
  
    const handleCheck = (index: Number) => {
      setSelect((prevExpanded) => prevExpanded.map((isChecked, i) => (i === index ? !isChecked : isChecked)));
    }
    const handleCheckAll = () => {
      // Check if all items are selected
      const allSelected = select.every((isChecked) => isChecked);
  
      // If all selected, unselect all, otherwise select all
      setSelect(select.map(() => !allSelected));
    };



  return (
    <div className='py-5 px-5 sm:px-16'>
      <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
        <Link href="/role" className='font-semibold text-third'>Dashboard /</Link>
        <h1 className='font-bold'>Les caisses</h1>
      </div>
      <div className='p-10 bg-white gap-10 rounded-md shadow-md'>
        <div className='mb-7 flex items-center'>
          <FaSearch className='absolute text-slate-500' />
          <input type="text" name="search" placeholder='Search to table' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
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
    </div>
  )
}