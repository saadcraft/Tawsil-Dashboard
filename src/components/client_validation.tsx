"use client"

import { getValidation } from '@/lib/super_action';
import { userInformation } from '@/lib/tools/store/web_socket'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Validation from './superviseur/validation';
import Pagination from './options/pagination';
import LoadingFirst from './loading';
import { notFound } from 'next/navigation';

export default function ClientValidation({ page, search, wilaya, is_active, groupe }: { page: string, search: string, wilaya: string, is_active: string, groupe: string }) {

    const { user } = userInformation();

    let result: Partenaire[] = []
    let totalAct = 0

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['agent_administratif', page, search, wilaya, is_active],
        queryFn: async () => await getValidation({ page, search, wilaya, is_active, groupe }),
        enabled: !!user?.role, // prevent premature call
    });

    if (user?.role === "superviseur" && wilaya) {
        totalAct = data?.totalAct ?? 0;
        result = data?.result ?? [];
    }
    else if (user?.role === "centre_appel") {
        totalAct = data?.totalAct ?? 0;
        result = data?.result ?? [];
    }

    if (isLoading) return <LoadingFirst />;
    if (isError || !data) notFound();

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <div>
            <Validation users={result} refresh={refetch} utilisateur={user!} />
            <Pagination pages={totalPages} currentPage={Number(page)} params={`search=${search}&wilaya=${wilaya}&is_active=${is_active}`} />
        </div>
    )
}
