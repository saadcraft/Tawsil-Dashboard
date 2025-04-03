import { Metadata } from 'next';
import React from 'react'
import Groupes from "@/components/appel_app/groupes"
import { getAllChef } from '@/lib/call_action';
import { notFound } from 'next/navigation';
import Pagination from '@/components/options/pagination';

export const metadata: Metadata = {
    title: "Les groupes",
    description: "Tawsil Start Dashbord",
};

type Props = {
    searchParams: Promise<{ page?: string, search?: string, wilaya?: string, groupe?: string }>
}

export default async function GroupesPage({ searchParams }: Props) {

    const { page, search, wilaya, groupe } = await searchParams;
    const pageNumber = page ?? "1";
    const search_num = search ?? "";
    const location = wilaya ?? "";
    const chef = groupe ?? "";

    const data = await getAllChef({ page: pageNumber, search: search_num, wilaya: location, groupe: chef })

    if (!data) notFound()

    const { result, totalAct } = data

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <div>
            <Groupes groupe={result} />
            <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${search_num}&wilaya=${location}&groupe=${chef}`} />
        </div>
    )
}
