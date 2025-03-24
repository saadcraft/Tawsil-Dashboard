import React from 'react';
import { FormatDate } from '@/lib/tools/tools';
import { TbMail, TbPhone, TbWorld } from 'react-icons/tb';
import { HiOutlineLocationMarker } from "react-icons/hi";

type PrintableModelProps = {
    command: GroupeVTC;
    user: Users;
    // tax: number;
}

const PrintableModelCousesGroup = ({ command, user }: PrintableModelProps) => {

    return (
        <div className="print-container">
            <div className="page">
                <div className="header mb-5">
                    <div className="logo-printer"></div>
                    <div className="flex items-center gap-10">
                        <div className="printer-head">
                            <span>
                                <h1>
                                    <span className="font-bold">Nom :</span>{' '}
                                    {command.partener__user__first_name}{' '}
                                    {command.partener__user__last_name}
                                </h1>
                                <h1>
                                    <span className="font-bold">Num Tel :</span>{' '}
                                    {command.partener__user__phone_number_1}
                                </h1>
                            </span>
                            <span>
                                <h1>
                                    <span className="font-bold">Agent :</span> {user.last_name}{' '}
                                    {user.first_name}
                                </h1>
                            </span>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-500">
                                Le: {FormatDate(new Date().toISOString())}
                            </p>
                            <p>{user.wilaya || "/"}</p>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-auto">
                    <table className="w-full text-sm text-left rtl:text-right table-printer">
                        <thead className="text-xs uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>

                                <th scope="col" className="text-right px-6 py-3">Taxe</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr
                                className="bg-white border-b dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {command.partener__user__id}
                                </th>
                                <td className="px-6 py-2 text-right">
                                    {command.total_tax_wi.toFixed(2)} DA
                                </td>
                            </tr>
                        </tbody>
                        <tfoot className="text-xs uppercase bg-gray-50">
                            <tr>
                                {/* <th></th> */}
                                {/* <th className="px-6 py-3 whitespace-nowrap">
                                </th> */}
                                {/* <th></th> */}
                                <th className="px-6 py-3 text-right">Total</th>
                                <th>
                                    <h1 className="text-right p-2 font-semibold text-xl flex whitespace-nowrap">
                                        {command.total_tax_wi.toFixed(2)} DA
                                    </h1>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className='relative'>
                    <div className='sign'>
                        <p>Signature Agent</p>
                        <p className='text-right'>Signature Partenaire</p>
                    </div>
                </div>

                <div className='info'>
                    <p><TbWorld /><span>tawsilstar.dz</span></p>
                    <p><TbMail /><span>contact@tawsilstar.dz</span></p>
                    <p><TbPhone /><span>+213 43 564 169</span></p>
                    <p><HiOutlineLocationMarker /><span>Kiffen, rue Derrar Sakkal 13000,Tlemcen,Algérie</span></p>
                </div>
            </div>
        </div>
    );
};

export default PrintableModelCousesGroup;