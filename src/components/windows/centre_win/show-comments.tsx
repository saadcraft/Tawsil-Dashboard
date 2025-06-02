
import React, { useEffect, useState } from 'react'
import { getCommant } from "@/lib/call_action"
import { CommentaireData } from "@/lib/type_module/center_type"
import { FormatDate } from '@/lib/tools/tools';
import { TbLoader3 } from 'react-icons/tb';

export default function ShowComment({ id }: { id: number }) {
    const [comments, setComments] = useState<CommentaireData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getCommant(id);
                setComments(data!);
                setIsLoading(false)
            } catch (err) {
                setError((err as Error).message || "Failed to load comments.");
                setIsLoading(false)
            }
        };

        fetchComments();
    }, [id]);


    // console.log(comments)
    const mappedComment = comments.map((pre, index) => {
        const com = pre.comm?.split(/\n/g);
        return (
            <tr key={index} className="bg-white border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                </th>
                <td className="px-6 py-4">
                    {FormatDate(pre.date_de_creation)}
                </td>
                <td className="px-6 py-4">
                    {pre.centre_appel.first_name}
                </td>
                <td className="px-6 py-4">
                    {com?.length == 2 ? (
                        <>
                            <p className='font-semibold'>{com[0]}</p>
                            <br />
                            {com[1]}
                        </>
                    ) : (
                        com
                    )}
                </td>
            </tr>
        )
    })

    return (
        <div className='fixed z-20 top-20 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='relative max-w-5xl h-5/6 overflow-auto mx-auto w-full rounded-xl p-5 bg-white'>
                <h1 className='font-semibold text-2xl'>Commentaires</h1>
                <div className="relative overflow-auto">
                    <table className="w-full text-sm text-left rtl:text-right0">
                        <thead className="text-xs uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Commentaire
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {mappedComment || error}
                            {/* {mappedComment || error}
                            {mappedComment || error} */}
                        </tbody>
                    </table>
                </div>
                <div className={`${isLoading ? '' : 'hidden'} absolute top-0 left-0 right-0 bottom-0 bg-forth bg-opacity-50 text-xl flex justify-center items-center gap-3`}>
                    <TbLoader3 className="animate-spin text-2xl" /> Loading ...
                </div>
            </div>
        </div>
    )
}