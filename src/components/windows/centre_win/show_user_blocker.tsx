"use client"

import React, { useEffect, useRef } from 'react'
import { getBlockedParteners } from "@/lib/call_action";
import { TbLoader3 } from 'react-icons/tb';
import { FaTrashRestore } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useInfiniteQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BlockUser2 } from '@/lib/auth';

export default function ShowCorbielle({ closeCorbiel, refresh }: { closeCorbiel: () => void, refresh: () => void }) {
    // const [comments, setComments] = useState<CommentaireData[]>([]);
    // const [error, setError] = useState<string | null>(null);
    // const [isLoading, setIsLoading] = useState(false);

    const listRef = useRef<HTMLDivElement | null>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch
        // isError,
    } = useInfiniteQuery({
        queryKey: ['blocked'],
        queryFn: async ({ pageParam = 1 }) => await getBlockedParteners({ page: String(pageParam) }),
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.result.length === 0) return undefined; // Handle null or no more pages
            return allPages.length + 1; // Simple page +1 logic
        },
        initialPageParam: 1, // Add initialPageParam
    });

    const handleRestore = async (id: number) => {
        const loadingToastId = toast.loading("Supprimer en coure ...")
        const res = await BlockUser2({ id, bloque: false })
        if (res) {
            toast.success("Utilisateur Supprimé", { id: loadingToastId })
            refetch()
            refresh()
        } else {
            toast.error("Problem de connection", { id: loadingToastId });
        }
    }

    // console.log(data)

    // Flatten the pages into a single array of deliveries
    const blockres = data?.pages
        .flatMap((page) => page?.result || [])
        .filter(Boolean) ?? [];

    // Infinite scroll logic
    useEffect(() => {
        const handleScroll = () => {
            const el = listRef.current;
            if (!el || isFetchingNextPage || !hasNextPage) return;

            const { scrollTop, scrollHeight, clientHeight } = el;
            if (scrollTop + clientHeight >= scrollHeight - 2) {
                fetchNextPage();
            }
        };

        const current = listRef.current;
        current?.addEventListener('scroll', handleScroll);

        return () => current?.removeEventListener('scroll', handleScroll);
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    // if (isError) setError("Failed to load comments.");

    // useEffect(() => {
    //     const fetchComments = async () => {
    //         try {
    //             const data = await getCommant(id);
    //             setComments(data);
    //             setIsLoading(false)
    //         } catch (err) {
    //             setError((err as Error).message || "Failed to load comments.");
    //             setIsLoading(false)
    //         }
    //     };

    //     fetchComments();
    // }, [id]);


    // console.log(comments)
    const mappedBlocked = blockres.map((pre, index) => {
        return (
            <tr key={index} className="bg-white border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {pre?.id}
                </th>
                <td className="px-6 py-4">
                    {pre?.user.username}
                </td>
                <td className="px-6 py-4">

                </td>
                <td className="px-6 py-4 flex justify-end text-right">
                    <button onClick={() => handleRestore(pre.user.id)} className='text-blue-600 border-2 cursor-pointer text-lg rounded-lg border-blue-600 p-1 font-semibold flex items-center justify-end gap-1'><FaTrashRestore /></button>
                </td>
            </tr>
        )
    })

    return (
        <div className='fixed z-50 top-20 flex items-center bottom-0 right-0 left-0 md:left-80 p-5 bg-opacity-50 bg-slate-700'>
            <div onClick={closeCorbiel} className='fixed inset-0 z-0'></div>
            <div className='relative z-50 max-w-5xl h-5/6 mx-auto w-full rounded-xl p-5 bg-white'>
                <div className='flex justify-between mb-2'>
                    <h1 className='font-semibold text-2xl'>Corbielle</h1>
                    <button onClick={closeCorbiel} className='rounded-full bg-gray-300 p-2'><MdOutlineClose /></button>
                </div>
                <div ref={listRef} className="relative h-5/6 overflow-auto">
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
                                <th scope="col" className="px-6 py-3 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {blockres.length > 0 ? (
                                mappedBlocked
                            ) : (
                                !isLoading &&
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-gray-500">
                                        Aucun partenaire bloqué trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {!hasNextPage && blockres.length > 0 && (
                        <div className="text-center py-4 text-sm text-gray-500">
                            ✅ Tous les partenaires bloqués sont chargés.
                        </div>
                    )}
                </div>
                <div className={`${isLoading ? '' : 'hidden'} absolute top-0 left-0 right-0 bottom-0 bg-forth bg-opacity-50 text-xl flex justify-center items-center gap-3`}>
                    <TbLoader3 className="animate-spin text-2xl" /> Loading ...
                </div>
            </div>
        </div>
    )
}