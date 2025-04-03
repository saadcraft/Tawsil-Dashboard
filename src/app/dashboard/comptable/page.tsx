
import Caisses from '@/components/comptable_app/caisses';
import Pagination from '@/components/options/pagination';
import { GetAllCasses } from '@/lib/comptable_action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
    title: "Les caisses",
    description: "Tawsil Start Dashbord",
};

type Props = {
    searchParams: Promise<{ page?: string, search?: string, date: string, chef: string, approvie: string, wilaya?: string }>
}

export default async function page({ searchParams }: Props) {

    const { page, search, date, chef, approvie, wilaya } = await searchParams;
    const pageNumber = page ?? "1";
    const client_num = search ?? "";
    const date_case = date ?? "";
    const chef_bureau = chef ?? "";
    const aprove = approvie ?? "";
    const city = wilaya ?? "";


    const data = await GetAllCasses({ page: pageNumber, search: client_num, date: date_case, chef: chef_bureau, approvie: aprove, wilaya: city })

    if (!data) notFound()

    const { result, totalAct } = data

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <div>
            <Caisses promise={result} />
            <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${client_num}&date=${date_case}&approvie=${aprove}&chef=${chef_bureau}&wilaya=${wilaya}`} />
        </div>
    )
}
