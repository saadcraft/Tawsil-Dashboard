import React from 'react';
import Image from 'next/image';
import { FormatDate } from '@/lib/tools/tools';

type PrintableModelProps = {
    command: Courses[];
    total: number;
    tax: number;
}

const PrintableModelCouses = ({ command, total, tax }: PrintableModelProps) => {
    return (
        <div className="p-5">
            {/* Header Section */}
            <div className="text-center mb-5">
                <div className='flex items-center gap-10'>
                    <Image height={100} width={100} src="/tawsil-start.png" alt="Logo" className="w-40 rounded-xl bg-six" />
                    <h1 className='font-bold text-5xl'>Tawsil-Star</h1>
                </div>
                <h1 className="text-2xl font-bold">Bon de livreur</h1>
                <p className="text-gray-500">La date creation: {FormatDate(new Date().toISOString())}</p>
            </div>

            {/* Table Section */}
            <div className="relative overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Client</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="text-right px-6 py-3">Somme livraison</th>
                            <th scope="col" className="text-right px-6 py-3">Tax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {command.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {index}
                                </th>
                                <td className="px-6 py-4">
                                    {item.client.first_name}{' '}
                                    {item.client.last_name}
                                </td>
                                <td className="px-6 py-4">
                                    {FormatDate(item.date_creation)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {item.prix}DA
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {item.tax_tawsile}DA
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h1 className="text-right p-2 font-semibold text-xl">Total: {total.toFixed(2)} DA</h1>
                <h1 className="text-right p-2 font-semibold text-xl">Tax: {tax.toFixed(2)} DA</h1>
            </div>
            <p className='absolute bottom-3 text-center w-full '>1/1</p>
        </div>
    );
};

export default PrintableModelCouses;