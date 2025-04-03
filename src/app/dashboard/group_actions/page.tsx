import type { Metadata } from "next";
import React from 'react'
import Pagination from "@/components/options/pagination";
import { notFound } from "next/navigation";
import CompAction from "@/components/comptable_app/comp_action";
import { getComptAction } from "@/lib/comptable_action";


export const metadata: Metadata = {
    title: "Les Actions List",
    description: "Tawsil Start Dashbord",
};


type actionData = {
    result: Actions[];
    totalAct: number;
    prixTotal: number;
};


export default async function GroupActionpage({ searchParams }:
    { searchParams: Promise<{ page: string; search: string, groupe: string, date: string }> }) {
    const { page, search, date, groupe } = await searchParams;
    const pageNumber = page ?? "1";
    const client_num = search ?? "";
    const date_case = date ?? "";
    const chef_bureau = groupe ?? "";

    const data = await getComptAction({ page: pageNumber, search: client_num, groupe: chef_bureau, date: date_case }) as unknown as actionData;

    if (!data) notFound();

    const { result, totalAct, prixTotal } = data;

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <div>
            <CompAction actions={result} total={prixTotal} />
            <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`?search=${client_num}&groupe=${chef_bureau}&date=${date_case}`} />
        </div>
    )
}
