
import React , { useEffect , useState } from 'react'
import { getCommant } from "@/lib/call_action"
import { CommentaireData } from "@/lib/type_module/center_type"

export default function ShowComment({ id }: { id: number }) {
    const [comments, setComments] = useState<CommentaireData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getCommant(id);
                setComments(data);
            } catch (err) {
                setError((err as Error).message || "Failed to load comments.");
            }
        };

        fetchComments();
    }, [id]);

    const mappedComment = comments.map((pre, index) => {
        return (
                <tr key={index} className="bg-white border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                    </th>
                    <td className="px-6 py-4">
                        {pre.centre_appel.first_name}
                    </td>
                    <td className="px-6 py-4">  
                        {pre.comm} 
                    </td>
                </tr>
        )
    })

    return (
        <div className='fixed top-0 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div className='max-w-5xl mx-auto rounded-xl p-5 bg-white'>
                <h1 className='font-semibold text-2xl'>Commentaires</h1>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right0">
                        <thead className="text-xs uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}