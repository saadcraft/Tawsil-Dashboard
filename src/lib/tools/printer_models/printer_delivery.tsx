import React from 'react';
import { FormatDate } from '@/lib/tools/tools';
import { TbWorld, TbPhone, TbMail } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";

type PrintableModelProps = {
    command: Result[];
    user: Users;
    tax: number;
}


const PrintableModel = ({ command, user, tax }: PrintableModelProps) => {
    const rowsOnFirstPage = 17; // Fewer rows on the first page
    const rowsPerPage = 22; // More rows on subsequent pages

    // Distribute commands into pages
    const paginatedCommands = command.reduce((acc: Result[][], item, index) => {
        const isOnFirstPage = acc.length === 0 && acc[0]?.length < rowsOnFirstPage;
        const pageIndex = isOnFirstPage
            ? 0
            : Math.floor((index - rowsOnFirstPage) / rowsPerPage) + 1;

        if (!acc[pageIndex]) acc[pageIndex] = [];
        acc[pageIndex].push(item);
        return acc;
    }, []);

    const totalPages = paginatedCommands.length;

    return (
        <div className="print-container">
            {paginatedCommands.map((pageCommands, pageIndex) => (
                <div key={pageIndex} className="page">
                    <p className="pagination">
                        Page {pageIndex + 1}/{totalPages}
                    </p>
                    {/* Header: Show only on the first page */}
                    {pageIndex === 0 && (
                        <div className="header mb-5">
                            <div className="logo-printer"></div>
                            <div className="flex items-center gap-10">
                                <div className="printer-head">
                                    <span>
                                        <h1>
                                            <span className="font-bold">Nom :</span>{' '}
                                            {command[0].livreur.partenneur.user.last_name}{' '}
                                            {command[0].livreur.partenneur.user.first_name}
                                        </h1>
                                        <h1>
                                            <span className="font-bold">Num Tel :</span>{' '}
                                            {command[0].livreur.partenneur.user.phone_number_1}
                                        </h1>
                                    </span>
                                    <span>
                                        <h1>
                                            <span className="font-bold">Agent :</span> {user.last_name}{' '}
                                            {user.first_name}
                                        </h1>
                                        <h1>
                                            <span className="font-bold">Nom :</span> {user.groupe}
                                        </h1>
                                    </span>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-500">
                                        La date: {FormatDate(new Date().toISOString())}
                                    </p>
                                    <p>{user.wilaya}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Table Section */}
                    <div className="relative overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right table-printer">
                            <thead className="text-xs uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Client</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th
                                        scope="col"
                                        className="text-right px-6 py-3 whitespace-nowrap"
                                    >
                                        Somme course
                                    </th>
                                    <th scope="col" className="text-right px-6 py-3">Tax</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageCommands.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {item.id}
                                        </th>
                                        <td className="px-6 py-2">
                                            {item.client.first_name} {item.client.last_name}
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            {FormatDate(item.created_at)}
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {item.delivery_price}DA
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            {(
                                                item.prix_de_tax
                                            ).toFixed(2)}
                                            DA
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {/* Footer only on the last page */}
                            {pageIndex === totalPages - 1 && (
                                <tfoot className="text-xs uppercase bg-gray-50">
                                    <tr>
                                        <th></th>
                                        <th className="px-6 py-3 whitespace-nowrap">
                                        </th>
                                        <th></th>
                                        <th className="px-6 py-3 text-right">Total</th>
                                        <th>
                                            <h1 className="text-right p-2 font-semibold text-xl flex whitespace-nowrap">
                                                {tax.toFixed(2)} DA
                                            </h1>
                                        </th>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                    {pageIndex === totalPages - 1 && (
                        <div className='sign'>
                            <p>Signature Agent</p>
                            <p className='text-right'>Signature Partenaire</p>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className='info'>
                        <p className='flex items-center'><TbWorld className='text-blue-500' />tawsilstar.dz</p>
                        <p className='flex items-center'><TbPhone className='text-blue-500' />+213 43 564 169</p>
                        <p className='flex items-center'><TbMail className='text-blue-500' />contact@tawsilstar.dz</p>
                        <p className='flex items-center'><FaMapMarkerAlt className='text-blue-500' />Kiffen, rue Derrar Sakkal 13000,Tlemcen,Algérie</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PrintableModel;