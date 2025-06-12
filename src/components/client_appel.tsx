"use client"

import { userInformation } from '@/lib/tools/store/web_socket'
import React, { useMemo } from 'react'
import AppleCenter from './appel_app/apple_center'
import CenterChef from './chef_app/center_chef'
import { getChefCentre, getParteners } from '@/lib/call_action'
import Pagination from './options/pagination'
import { useQuery } from '@tanstack/react-query'
import LoadingFirst from './loading'
import { notFound } from 'next/navigation'

export default function ClientAppel({ page, search, groupe }: { page: string, search: string, groupe: string }) {

    const { user } = userInformation()

    const fetchFn = async () => {
        if (user?.role === 'centre_appel' || user?.role === 'admin') {
            return await getParteners({ page, search, groupe });
        } else {
            return await getChefCentre({ page, search });
        }
    };

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['appel-data', user?.role, page, search, groupe],
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
            {user?.role === "centre_appel" || user?.role === "admin" ?
                <AppleCenter parteners={data.result} refresh={refetch} group={groupe} />
                :
                <CenterChef parteners={data.result} refresh={refetch} />
            }
            <Pagination pages={totalPages} currentPage={Number(page)} params={`search=${search}&groupe=${groupe}`} />
        </div>
    )
}
