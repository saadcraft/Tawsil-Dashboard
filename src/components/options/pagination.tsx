"use client"

import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useRouter } from 'next/navigation'
import LoadingFirst from '../loading'

type props = {
    currentPage: number;
    pages: number;
    params: string;
}

export default function Pagination({ currentPage, pages, params }: props) { // Globle Pagination

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pages) {
            router.push(`?page=${page}&${params}`);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        setIsLoading(false)
    }, [currentPage])

    const generatePageNumbers = (): (number | string)[] => {
        const pageNumbers: (number | string)[] = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(pages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (currentPage < pages - 2) {
            if (currentPage < pages - 3) pageNumbers.push("...");
            pageNumbers.push(pages);
        }

        return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div>
            <div className="relative -top-20 z-0 max-w-2xl ml-28 flex gap-5 justify-left items-center">
                <div className="flex items-center gap-2">
                    {pages >= 4 && currentPage >= 4 ?
                        <span onClick={() => handlePageChange(1)} className="bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-full p-1 sm:p-2">
                            <MdKeyboardDoubleArrowLeft />
                        </span>
                        : null
                    }
                    <span onClick={() => handlePageChange(currentPage - 1)} className="bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-full p-1 sm:p-2">
                        <FaArrowLeft />
                    </span>
                    {pageNumbers.map((Num, index) => {
                        if (Num === "...") {
                            return (
                                <span key={index} className="bg-forth rounded-full sm:py-1 sm:px-3 cursor-pointer hover:bg-third">
                                    {Num}
                                </span>
                            )
                        }
                        return (
                            <span onClick={() => Num != currentPage && handlePageChange(Number(Num))} key={index} className={`${Num == currentPage ? 'bg-primer text-white' : 'bg-forth'} rounded-full px-1 text-sm sm:text-base  sm:py-1 sm:px-3 cursor-pointer hover:bg-third`} title={`page${Num}`}>
                                {Num}
                            </span>
                        )
                    })}
                    <span onClick={() => handlePageChange(currentPage + 1)} className="bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-full p-1 sm:p-2">
                        <FaArrowRight />
                    </span>
                </div>
            </div>
            <div className={`${isLoading ? '' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 bg-forth bg-opacity-50 flex justify-center items-center`}>
                <LoadingFirst />
            </div>
        </div>
    )
}
