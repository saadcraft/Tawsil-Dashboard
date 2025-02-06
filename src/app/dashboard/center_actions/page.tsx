import ActionsCenter from "@/components/appel_app/actions";
import React from 'react'
import { centerAction } from "@/lib/actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Pagination from "@/components/options/pagination";


export const metadata: Metadata = {
    title: "Les Actions List",
    description: "Tawsil Start Dashbord",
};


export default async function ActionCenterPage({ searchParams }:
    { searchParams: Promise<{ page: string; search: string, date: string }> }) {

    const { page, search, date } = await searchParams;
    const pageNumber = page ?? "1";
    const searchNum = search ?? "";
    const searchDate = date ?? "";

    const data = await centerAction({ page: pageNumber, search: searchNum, date: searchDate })

    if (!data) notFound()

    const { result, totalAct } = data

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <>
            <ActionsCenter actions={result} />
            <Pagination currentPage={Number(pageNumber)} pages={totalPages} params={`search=${searchNum}&date=${searchDate}`} />
        </>
    )

}