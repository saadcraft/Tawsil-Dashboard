import Pagination from '@/components/options/pagination';
import { getAllInOneCourses } from '@/lib/gestion_action';
import { Metadata } from 'next';
import React from 'react'

// import useStore from '@/components/providers/SessionProvider'
import { notFound } from 'next/navigation';
import GroupVtc from '@/components/gestion_app/group_vtc';

export const metadata: Metadata = {
    title: "courses par groupe",
    description: "Tawsil Start Dashbord",
};

type props = {
    searchParams: Promise<{ page?: string, search?: string, valide?: string, wilaya?: string }>;
}

export default async function CoursesPage({ searchParams }: props) {

    const { page, search, valide, wilaya } = await searchParams;
    const pageNumber = page ?? "1";
    const client_num = search ?? "";
    const valide_payment = valide ?? "";
    const city = wilaya ?? "";

    const data = await getAllInOneCourses({ page: pageNumber, search: client_num, valide: valide_payment, wilaya: city })

    if (!data) notFound()

    const { result, totalAct } = data

    return (
        <div>
            <GroupVtc promise={result} />
            <Pagination pages={totalAct} currentPage={Number(pageNumber)} params={`search=${client_num}&valide=${valide_payment}&wilaya=${city}`} />
        </div>
    )
}