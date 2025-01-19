"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { ValideCommande, ValideSecond, ValideThird } from "../windows/chef_win/valide_commande"
import { MdClose } from "react-icons/md";
import { SubmitCommande } from '@/lib/action_client'
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { FormatDate, handleInputChange } from "@/lib/tools/tools"

type Props = {
  promise: Result[];
};

export default function Delivery({ promise }: Props) {

  const [select, setSelect] = useState(promise)

  const [selectedRows, setSelectedRows] = useState<Result[]>([])

  const [isVisible, setIsVisible] = useState<number>(0);

  console.log(selectedRows)

  const router = useRouter()

  useEffect(() => {
    setSelect(promise)
    setSelect((prevSelect) =>
      prevSelect.map((row) => ({
        ...row,
        selected: selectedRows.some((selectedRow) => selectedRow.id === row.id), // Update `selected` as true if in `selectedRows`, false otherwise
      }))
    );
  }, [promise, selectedRows])

  const handleCheck = (index: number) => {
    setSelect((prev) => {
      return prev.map((row, i) => {
        if (i === index) {
          const newRow = { ...row, selected: !row.selected };

          // Add or remove the row from selectedRows when checkbox is toggled
          if (newRow.selected && !newRow.valide_payment) {
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

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cleint = formData.get('client') as string;
    const validation = formData.get('valide') as string;

    router.push(`?livreur=${cleint}&valide=${validation}`);
  }

  const handleCheckAll = () => {
    const nonValideRows = select.filter((row) => !row.valide_payment);
    const allSelected = nonValideRows.every((row) => row.selected);

    // Update the select state (checkbox selection state)
    const updatedSelect = select.map((row) => ({
      ...row,
      selected: row.valide_payment ? row.selected : !allSelected,
    }));

    setSelect(updatedSelect);

    // After updating `select`, update selectedRows
    if (allSelected) {
      // If all were selected, clear selectedRows
      setSelectedRows((prevSelected) =>
        prevSelected.filter(
          (selectedRow) => !select.some((pageRow) => pageRow.id === selectedRow.id)
        ));
    } else {
      // If not all were selected, add all rows to selectedRows
      setSelectedRows((prevSelected) => {
        // Filter the newly selected rows
        const newSelections = updatedSelect.filter(
          (row) => row.selected && !row.valide_payment && !prevSelected.some((selectedRow) => selectedRow.id === row.id)
        );

        // Combine previous selections with new ones
        return [...prevSelected, ...newSelections];
      });
    }
  };

  const handleValidate = () => { setIsVisible(1) }
  const handleSecond = () => { setIsVisible(2) }
  const handleThird = () => { setIsVisible(3) }
  const handleClose = () => { setIsVisible(0) }

  const hundleSubmite = async (ids: number[]) => {

    const loadingToastId = toast.loading('Submite Commande...');

    try {
      const result = await SubmitCommande({ id: ids });
      if (result) {
        toast.success('valider Succesfully', { id: loadingToastId });
        setIsVisible(0);
        setSelectedRows([])
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


  const Commands = select.map((pre, index) => {
    return (
      <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
        <td className="px-6 py-4">
          <input type="checkbox" name='check' id="check" onChange={() => handleCheck(index)} disabled={pre.valide_payment} checked={pre.valide_payment ? false : pre.selected} />
        </td>
        <td className="px-6 py-4">
          {FormatDate(pre.created_at)}
        </td>
        <td className="px-6 py-4">
          {pre.client.first_name} {pre.client.last_name}
        </td>
        <td className="px-6 py-4">
          {pre.livreur.partenneur.user.phone_number_1}
        </td>
        <td className="px-6 py-4">
          {pre.livreur.partenneur.user.first_name} {pre.livreur.partenneur.user.last_name}
        </td>
        <td className="px-6 py-4">
          {pre.valide_payment ? "true" : "false"}
        </td>
        <td className="px-6 py-4 text-right">
          {pre.delivery_price}
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
        <form onSubmit={(event) => handleSearch(event)} className='mb-7 flex items-center gap-2'>
          <FaSearch className='absolute text-slate-500' />
          <input onChange={handleInputChange} type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
          <div className='flex gap-2'>
            <div>
              <input type="radio" id="noValide" name="valide" defaultChecked value="No" className="peer hidden" />
              <label htmlFor="noValide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> No valider</label>
            </div>
            <div>
              <input type="radio" id="valide" name="valide" value="Yes" className="peer hidden" />
              <label htmlFor="valide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> valider</label>
            </div>
          </div>
          <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Recherch</button>
        </form>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-primer">
              <tr>
                <th className="px-6 py-3">
                  <input type="checkbox" name='check' id="check" onChange={handleCheckAll} checked={select.every((row) => (row.selected && !row.valide_payment) || row.valide_payment)} />
                </th>
                <th className="px-6 py-3">
                  Date
                </th>
                <th className="px-6 py-3">
                  Livreur
                </th>
                <th className="px-6 py-3">
                  Télephone
                </th>
                <th className="px-6 py-3">
                  Client
                </th>
                <th className="px-6 py-3">
                  Validation
                </th>
                <th className="px-6 py-3 text-right">
                  Tax
                </th>
              </tr>
            </thead>
            <tbody className='odd:bg-six even:bg-fifth'>
              {Commands}
            </tbody>
          </table>
        </div>
        <div className='relative p-5'>
          <button onClick={handleValidate} disabled={selectedRows.length === 0 || new Set(selectedRows.map((row) => row.livreur.partenneur.user.id)).size > 1 ? true : false} className='absolute right-0 bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>validé</button>
        </div>
      </div>
      {isVisible === 1 ?
        <div>
          <button onClick={handleClose} className='fixed z-50 top-28 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
          <ValideCommande command={selectedRows} onEvent={handleSecond} onBack={handleClose} />
        </div>
        : ""}
      {isVisible === 2 ?
        <div>
          <button onClick={handleClose} className='fixed z-50 top-28 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
          <ValideSecond command={selectedRows} onEvent={handleThird} onBack={handleValidate} />
        </div>
        : ""}
      {isVisible === 3 ?
        <div>
          <button onClick={handleClose} className='fixed z-50 top-28 right-10 text-third p-2 font-bold text-5xl'><MdClose /></button>
          <ValideThird command={selectedRows} onBack={handleSecond} onSub={hundleSubmite} />
        </div>
        : ""}
    </div>
  )
}