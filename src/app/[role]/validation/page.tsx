import Pagination from '@/components/options/pagination';
import Validation from '@/components/superviseur/validation'
import { getValidation } from '@/lib/super_action';
import { notFound } from 'next/navigation';
import React from 'react'

type props = {
    searchParams: Promise<{ page?: string, search?: string, wilaya?: string, is_active?: string }>;
}

export default async function ValidationPage({ searchParams }: props) {

    const { page, search, wilaya, is_active } = await searchParams;
    const pageNumber = page ?? "1";
    const search_num = search ?? "";
    const location = wilaya ?? "";
    const active = is_active ?? "";

    let result: Partenaire[] = []
    let totalAct = 0

    const data = await getValidation({ page: pageNumber, search: search_num, wilaya: location, is_active: active, groupe: "" });

    if (!data) notFound()

    if (wilaya) {
        totalAct = data.totalAct;
        result = data.result;
    }

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <div>
            <Validation users={result} />
            <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${search_num}&wilaya=${location}&is_active=${active}`} />
        </div>
    )
}
