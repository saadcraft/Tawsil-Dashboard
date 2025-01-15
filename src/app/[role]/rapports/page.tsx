import Pagination from '@/components/options/pagination';
import Reports from '@/components/superviseur/reports';
import { ShowReport } from '@/lib/super_action';;
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Rapports",
    description: "Tawsil Start Dashbord",
};

type props = {
    searchParams: Promise<{ page?: string }>;
}

export default async function ReportPage({ searchParams }: props) {

    const { page } = await searchParams;
    const pageNumber = page ?? "1";
    const { result, totalAct } = await ShowReport({ page: pageNumber });

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <div>
            <Reports reports={result} />
            <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={``} />
        </div>
    )
}
