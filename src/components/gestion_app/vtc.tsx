"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { notFound, useRouter } from "next/navigation"
import { FormatDate, handleInputChange } from '@/lib/tools/tools'
import { ValideCommande, ValideSecond, ValideThird } from '../windows/gestion_win/valide_courses'
import { MdClose } from 'react-icons/md'
import { ValideCourses } from '@/lib/gestion_action'
import { userInformation } from '@/lib/tools/store/web_socket'
import { Wilaya } from '@/lib/tools/named'

type Props = {
    // user: Users
    promise: Courses[];
};

export default function Vtc({ promise }: Props) {

    // console.log(promise)

    const [select, setSelect] = useState(promise)

    const [selectedRows, setSelectedRows] = useState<Courses[]>([])

    const [isVisible, setIsVisible] = useState<number>(0);

    const router = useRouter()

    const { user } = userInformation()

    useEffect(() => {
        setSelect(promise)
        setSelect((prevSelect) =>
            prevSelect.map((row) => ({
                ...row,
                selected: selectedRows.some((selectedRow) => selectedRow.id === row.id), // Update `selected` as true if in `selectedRows`, false otherwise
            }))
        );
    }, [promise, selectedRows])

    if (!user) return notFound()

    // console.log(selectedRows)

    const handleCheck = (index: number) => {
        setSelect((prev) => {
            return prev.map((row, i) => {
                if (i === index) {
                    const newRow = { ...row, selected: !row.selected };

                    // Add or remove the row from selectedRows when checkbox is toggled
                    if (newRow.selected && !newRow.paye) {
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
        const nonValideRows = select.filter((row) => !row.paye);
        const allSelected = nonValideRows.every((row) => row.selected);

        // Update the select state (checkbox selection state)
        const updatedSelect = select.map((row) => ({
            ...row,
            selected: row.paye ? row.selected : !allSelected,
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
                    (row) => row.selected && !row.paye && !prevSelected.some((selectedRow) => selectedRow.id === row.id)
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

        const result = await ValideCourses({ courseIds: ids });
        if (result) {
            setIsVisible(0);
            setSelectedRows([])
            router.refresh()
            return true
        } else {
            return false
        }
    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const cleint = formData.get('client') as string;
        const validation = formData.get('valide') as string;
        const wilaya = formData.get('wilaya') as string;

        router.push(`?search=${cleint}&valide=${validation}&wilaya=${wilaya}`);
    }

    const Commands = select.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b text-black hover:bg-gray-50">
                <td className="px-6 py-4">
                    <input type="checkbox" name='check' id="check" onChange={() => handleCheck(index)} disabled={pre.paye} checked={pre.paye ? false : pre.selected} />
                </td>
                <td className="px-6 py-4">
                    {FormatDate(pre.date_creation)}
                </td>
                <td className="px-6 py-4">
                    {pre.client.first_name} {pre.client.last_name}
                </td>
                <td className="px-6 py-4">
                    {pre.partener.user.phone_number_1}
                </td>
                <td className="px-6 py-4">
                    {pre.partener.user.first_name} {pre.partener.user.last_name}
                </td>
                <td className="px-6 py-4">
                    {pre.paye ? "true" : "false"}
                </td>
                <td className="px-6 py-4 text-right">
                    {pre.tax_tawsile}
                </td>
            </tr>
        )
    })


    return (
        <div className='py-5 px-5 sm:px-16'>
            <div className='flex items-center gap-2 px-5 pb-5'>
                <Link href="/dashboard" className='font-semibold text-third'>Tableau de bord /</Link>
                <h1 className='font-bold text-xl'>VTC</h1>
            </div>
            <div className='p-10 pb-20 bg-white rounded-md shadow-md'>
                <div className='flex justify-between mb-7 items-center'>
                    <form onSubmit={handleSearch} className='flex items-center gap-2'>
                        <FaSearch className='absolute text-slate-500' />
                        <input onChange={handleInputChange} type="text" name="client" placeholder='Search with Number' className='border-b outline-none py-2 pl-7 focus:border-slate-950' />
                        <div className='flex gap-2'>
                            <div>
                                <input type="radio" id="noValide" name="valide" defaultChecked value="false" className="peer hidden" />
                                <label htmlFor="noValide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> No valider</label>
                            </div>
                            <div>
                                <input type="radio" id="valide" name="valide" value="true" className="peer hidden" />
                                <label htmlFor="valide" className='cursor-pointer border rounded-lg text-slate-400 peer-checked:text-third peer-checked:border-third p-2'> valider</label>
                            </div>
                        </div>
                        <select name="wilaya" className='border-b outline-none py-2 pl-7 focus:border-slate-950'>
                            <option value="">Sélection Wilaya</option>
                            {Wilaya.map(pre => {
                                return (
                                    <option key={pre.id} value={pre.name}>{pre.id} - {pre.name}</option>
                                )
                            })}
                        </select>
                        <button className='bg-blue-500 font-semibold hover:bg-third text-white p-2 rounded-lg'>Submit</button>
                    </form>
                    <button onClick={handleValidate} disabled={selectedRows.length === 0 || new Set(selectedRows.map((row) => row.partener.user.id)).size > 1 ? true : false} className='bg-green-600 disabled:bg-opacity-20 px-4 py-2 text-white rounded-lg font-semibold'>validé</button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-primer">
                            <tr>
                                <th className="px-6 py-3">
                                    <input type="checkbox" name='check' id="check" onChange={handleCheckAll} checked={select.every((row) => (row.selected && !row.paye) || row.paye)} />
                                </th>
                                <th className="px-6 py-3">
                                    id
                                </th>
                                <th className="px-6 py-3">
                                    Date
                                </th>
                                <th className="px-6 py-3">
                                    agent
                                </th>
                                <th className="px-6 py-3">
                                    Taxieur
                                </th>
                                <th className="px-6 py-3">
                                    Validation
                                </th>
                                <th className="px-6 py-3 text-right">
                                    totale
                                </th>
                            </tr>
                        </thead>
                        <tbody className='odd:bg-six even:bg-fifth'>
                            {Commands}
                        </tbody>
                    </table>
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
                    <ValideThird command={selectedRows} onBack={handleSecond} onSub={hundleSubmite} user={user} />
                </div>
                : ""}
        </div>
    )
}
