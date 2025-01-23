import ModAgent from '@/components/chef_app/modifie_agent';
import Pagination from '@/components/options/pagination';
import { getSuperviseur } from '@/lib/super_action';
import { notFound } from 'next/navigation';
import React from 'react'

type props = {
    searchParams: Promise<{ page?: string, search?: string }>;
}

export default async function ModySuperPage({ searchParams }: props) {

    const { page, search } = await searchParams;
    const pageNumber = page ?? "1";
    const search_num = search ?? "";
    const superviseurData = await getSuperviseur({ page: pageNumber, search: search_num });
    if (!superviseurData) notFound();
    const { result, totalAct } = superviseurData;

    if (totalAct === 0 || result.length === 0) notFound()

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <div>
            <ModAgent results={result} />
            <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${search_num}`} />
        </div>
    )
}
