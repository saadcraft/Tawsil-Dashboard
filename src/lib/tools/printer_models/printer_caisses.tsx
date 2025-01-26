import { FormatDate } from '@/lib/tools/tools';
import { TbWorld, TbPhone } from "react-icons/tb";

type PrintableModelProps = {
    user: Users,
    real: number;
    total: number;
    acount: number;
}

export function PrinteCasses({ user, real, total, acount }: PrintableModelProps) {

    const negative = real - total;
    return (
        <div>
            <div className="header mb-5">
                <div className="logo-printer"></div>
                <div className="flex items-center gap-10">
                    <div className="printer-head">
                        <span>
                            <h1>
                                <span className="font-bold">Partenaire :</span> {user.last_name}{' '}
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

            <div className="relative overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right table-printer">
                    <thead className="text-xs uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="p-3">ID</th>
                            <th scope="col" className="p-3">Total</th>
                            <th scope="col" className="p-3">Réel</th>
                            <th
                                scope="col"
                                className="text-right p-3 whitespace-nowrap"
                            >
                            </th>
                            <th scope="col" className="text-right p-3">a compte</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:border-gray-700">
                            <th className='text-center'>1</th>
                            <td className="px-6 py-4 text-lg">{total}</td>
                            <td className="px-6 py-4 text-lg text-center">{real}</td>
                            <td></td>
                            <td className="px-6 py-4 text-lg text-right">{acount ? acount : 0}</td>
                        </tr>
                    </tbody>
                    <tfoot className="text-xs uppercase bg-gray-50">
                        <tr>
                            <th></th>
                            <th className="px-6 py-3 whitespace-nowrap">
                                <h1 className="text-right p-2 font-semibold text-lg flex whitespace-nowrap">Merci pour votre entreprise</h1>
                            </th>
                            <th></th>
                            <td className="px-6 py-3 text-right">
                                <h1 className="text-right p-2 font-semibold text-xl flex whitespace-nowrap">Total:</h1>
                                <h1 className="text-right p-2 font-semibold text-xl flex whitespace-nowrap">Manque:</h1>
                            </td>
                            <td>
                                <h1 className="text-right p-2 font-semibold text-xl flex whitespace-nowrap">
                                    {total.toFixed(2)} DA
                                </h1>
                                <h1 className={`${negative < 0 && "manque"} text-right p-2 font-semibold text-xl flex whitespace-nowrap`}>{negative.toFixed(2)} DA</h1>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className='info'>
                <p className='flex items-center'><TbWorld className='text-blue-500' />tawsilstar.dz</p>
                <p className='flex items-center'><TbPhone className='text-blue-500' />+213 43 564 169</p>
            </div>
        </div>
    )
}