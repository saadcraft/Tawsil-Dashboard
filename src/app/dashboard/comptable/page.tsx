
import Caisses from '@/components/comptable_app/caisses';
import { getAllChef } from '@/lib/call_action';
import { GetAllCasses } from '@/lib/comptable_action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
    title: "Les caisses",
    description: "Tawsil Start Dashbord",
};

type Props = {
    searchParams: Promise<{ page?: string, search?: string, date: string, chef: string }>
}

export default async function page({ searchParams }: Props) {

    const { page, search, date, chef } = await searchParams;
    const pageNumber = page ?? "1";
    const client_num = search ?? "";
    const date_case = date ?? "";
    const chef_bureau = chef ?? "";

    const data = await GetAllCasses({ page: pageNumber, search: client_num, date: date_case, chef: chef_bureau })

    if (!data) notFound()

    const Allchef = await getAllChef()

    const { result } = data

    return (
        <div>
            <Caisses promise={result} chefs={Allchef} />
        </div>
    )
}
