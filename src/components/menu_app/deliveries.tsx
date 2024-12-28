"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ValideCommande from '../windows/valide_first'
import { MdClose } from "react-icons/md";

type Props = {
  promise: Result[];
};

export default function Delivery({ promise }: Props) {

  const [select, setSelect] = useState(promise)

  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const [isVisible, setIsVisible] = useState<boolean>(false)

  console.log(selectedRows);

  const handleCheck = (index: number) => {
    setSelect((prev) => {
      return prev.map((row, i) => {
        if (i === index) {
          const newRow = { ...row, selected: !row.selected };
  
          // Add or remove the row from selectedRows when checkbox is toggled
          if (newRow.selected) {
            // Add to selectedRows only if it doesn't already exist
            setSelectedRows((prevSelected) => {
              if (!prevSelected.some((selectedRow) => selectedRow.id === newRow.id)) {
                return [...prevSelected, newRow];
              }
              return prevSelected; // Avoid adding the same row again
            });
          } else {
            // Remove from selectedRows if unchecked
            setSelectedRows((prevSelected) =>
              prevSelected.filter((selectedRow) => selectedRow.id !== newRow.id)
            );
          }
          return newRow;
        }
        return row;
      });
    });
  };

  const handleCheckAll = () => {
    const allSelected = select.every((row) => row.selected);
    setSelect(select.map((row) => ({ ...row, selected: !allSelected })));

    if (allSelected) {
      // If all were selected, clear selectedRows
      setSelectedRows([]);
    } else {
      // If not all were selected, add all rows to selectedRows
      setSelectedRows(select.filter((row) => !row.selected));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) {
      event.target.value = value.replace(/\D/g, ''); // Remove non-numeric characters
    }
  };

  const handleValidate = () => {
    return(
      setIsVisible(pre => !pre)
    )
  }


  const Commands = select.map((pre, index) => {
    return (
      <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
        <td className="px-6 py-4">
          <input type="checkbox" name='check' id="check" onChange={() => handleCheck(index)} checked={pre.selected || false} />
        </td>
        <td className="px-6 py-4">
          {pre.client.first_name} {pre.client.last_name}
        </td>
        <td className="px-6 py-4">
          {pre.livreur.partenneur.user.first_name} {pre.livreur.partenneur.user.last_name}
        </td>
        <td className="px-6 py-4">
          {pre.valide_payment ? "true" : "false"}
        </td>
        <td className="px-6 py-4">
          {pre.delivery_price}
        </td>
        <td className="px-6 py-4 text-right">
          {pre.total_price}
        </td>
      </tr>
    )
  })

  return (
    <div className='py-5 px-5 sm:px-16'>
      <div className='flex items-center gap-2 px-5 pb-5 text-xs lg:text-xl'>
        <Link href="/role" className='font-semibold text-third'>Dashboard /</Link>
        <h1 className='font-bold'>Livraisons</h1>
      </div>
      <div className='p-10 bg-white rounded-md shadow-md'>
        <form className='mb-7 flex items-center gap-2'>
          <FaSearch className='absolute text-slate-500' />
          <input onChange={handleInputChange} type="text" name="search" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
          <div className='flex gap-2'>
            <div>
              <input type="radio" id="noValide" name="valide" defaultChecked value="No" className="peer hidden"/>
              <label htmlFor="noValide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> No valider</label>
            </div>
            <div>
              <input type="radio" id="valide" name="valide" value="Yes" className="peer hidden"/>
              <label htmlFor="valide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> valider</label>
            </div>
          </div>
          <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Submit</button>
        </form>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-primer">
              <tr>
                <th className="px-6 py-3">
                  <input type="checkbox" name='check' id="check" onChange={handleCheckAll} checked={select.every((row) => row.selected)} />
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
              {Commands}
            </tbody>
          </table>
        </div>
        <div className='relative p-5'>
          <button onClick={handleValidate} className='absolute right-0 bg-green-600 px-4 py-2 text-white rounded-lg font-semibold'>validé</button>
        </div>
      </div>
      {isVisible ? 
      <div>
        <button onClick={handleValidate} className='fixed z-50 top-20 right-10 text-white p-2 font-bold text-5xl'><MdClose /></button>
        <ValideCommande command={selectedRows} />
      </div>
: ""}
    </div>
  )
}