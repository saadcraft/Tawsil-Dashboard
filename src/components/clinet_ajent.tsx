"use client"

import { getAgents } from '@/lib/call_action';
import { getAllAgent } from '@/lib/gestion_action';
import { userInformation } from '@/lib/tools/store/web_socket'
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react'
import LoadingFirst from './loading';
import { notFound } from 'next/navigation';
import Pagination from './options/pagination';
import ModAgent from './chef_app/modifie_agent';
import ShowAgent from './gestion_app/show_agent';

export default function ClientAgent({ page, search, wilaya, groupe }: { page: string, search: string, wilaya: string, groupe: string }) {

    const { user } = userInformation()

    const fetchFn = async () => {
        if (user?.role === 'chef_bureau') {
            return await getAgents({ page, search });
        } else if (user?.role === "gestion_commercial") {
            return await getAllAgent({ role: "agent_administratif", page, search, wilaya, groupe });
        }
    };

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['agent_administratif', user?.role, page, search, wilaya, groupe],
        queryFn: fetchFn,
        enabled: !!user?.role, // prevent premature call
    });

    const totalPages = useMemo(() => {
        return data?.totalAct ? Math.ceil(data.totalAct / 20) : 0;
    }, [data]);

    //   if (!user) return <div>Loading user info...</div>;
    if (isLoading) return <LoadingFirst />;
    if (isError || !data) notFound();

    return (
        <div>
            {user && user.role === "chef_bureau" ?
                <ModAgent results={data.result} refresh={refetch} />
                :
                <ShowAgent results={data.result} />}
            <Pagination pages={totalPages} currentPage={Number(page)} params={`search=${search}`} />
        </div>
    )
}
