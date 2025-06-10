import ClientValidation from '@/components/client_validation';
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

    return (
        <div>
            <ClientValidation page={pageNumber} search={search_num} wilaya={location} is_active={active} groupe="" />
        </div>
    )
}
