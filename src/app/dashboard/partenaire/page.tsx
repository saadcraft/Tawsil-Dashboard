import Parteneure from '@/components/gestion_app/parteneure';
import Pagination from '@/components/options/pagination';
// import { getMagasin } from '@/lib/gestion_action';
import { getValidation } from '@/lib/super_action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
    title: "Partenaire",
    description: "Tawsil Start Dashbord",
};

type props = {
    searchParams: Promise<{ page?: string, search?: string, is_active?: string, wilaya?: string, groupe?: string }>;
}

export default async function VTCpage({ searchParams }: props) {

    const { page, search, is_active, wilaya, groupe } = await searchParams;
    const pageNumber = page ?? "1";
    const search_num = search ?? "";
    const active = is_active ?? "";
    const location = wilaya ?? "";
    const chef = groupe ?? "";

    const data = await getValidation({ page: pageNumber, search: search_num, wilaya: location, is_active: active, groupe: chef });

    // const magasine = await getMagasin()

    if (!data) notFound()

    const { result, totalAct } = data

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <>
            <Parteneure users={result} />
            <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${search_num}&wilaya=${location}&is_active=${active}&groupe=${chef}`} />
        </>
    )
}
