import Parteneure from '@/components/gestion_app/parteneure';
import { getValidation } from '@/lib/super_action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
    title: "livraisons",
    description: "Tawsil Start Dashbord",
};

type props = {
    searchParams: Promise<{ page?: string, search?: string, is_active?: string, wilaya?: string }>;
}

export default async function VTCpage({ searchParams }: props) {

    const { page, search, is_active, wilaya } = await searchParams;
    const pageNumber = page ?? "1";
    const search_num = search ?? "";
    const active = is_active ?? "";
    const location = wilaya ?? "";

    const data = await getValidation({ page: pageNumber, search: search_num, wilaya: location, is_active: active });

    if (!data) notFound()

    const totalAct = data.totalAct;
    const result = data.result;

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <Parteneure users={result} />
    )
}
