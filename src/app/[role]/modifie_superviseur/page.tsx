import ModAgent from '@/components/chef_app/modifie_agent';
import Pagination from '@/components/options/pagination';
import { getSuperviseur } from '@/lib/super_action';
import React from 'react'

type props = {
    searchParams: Promise<{ page?: string, search?: string }>;
}

export default async function ModySuperPage({ searchParams }: props) {

    const { page, search } = await searchParams;
    const pageNumber = page ?? "1";
    const search_num = search ?? "";
    const { result, totalAct } = await getSuperviseur({ page: pageNumber, search: search_num });

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <div>
            <ModAgent results={result} />
            <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${search_num}`} />
        </div>
    )
}
