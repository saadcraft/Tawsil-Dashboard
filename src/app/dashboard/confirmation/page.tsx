import CommandeCentre from '@/components/appel_app/confirmation';
import Pagination from '@/components/options/pagination';
import { centreAppelConfirmation } from '@/lib/tutorial_api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
    title: "Confirmation",
    description: "Tawsil Start Dashbord",
};

type props = {
    searchParams: Promise<{ page?: string, confirmation?: string, search?: string }>;
}

export default async function CondirmationPage({ searchParams }: props) {

    const { page, confirmation, search } = await searchParams;
    const pageNumber = page ?? "1";
    const confirme = confirmation ?? "";
    const searchName = search ?? "";

    const data = await centreAppelConfirmation({ page: pageNumber, confirmation: confirme, search: searchName })

    if (!data) notFound();

    // console.log(data)


    const { result, totalAct } = data;

    return (
        <div>
            <CommandeCentre commande={result} />
            <Pagination pages={totalAct} currentPage={Number(pageNumber)} params={`confirmation=${confirme}&search=${searchName}`} />
        </div>
    )
}
