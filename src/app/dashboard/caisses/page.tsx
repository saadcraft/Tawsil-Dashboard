import type { Metadata } from "next";
import React from 'react'
import Caisses from "@/components/chef_app/caisses"
import { getCasses } from "@/lib/action_client";
import Pagination from "@/components/options/pagination";
import { getUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Les caisses",
  description: "Tawsil Start Dashbord",
};

type props = {
  searchParams: Promise<{ page?: string, search_date?: string }>;
}

export default async function CaissePage({ searchParams }: props) {

  const { page, search_date } = await searchParams;
  const pageNumber = page ?? "1";
  const search_num = search_date ?? "";

  const { result, totalAct } = await getCasses({ page: pageNumber, search_date: search_num });

  const user = await getUser()

  const totalPages = Math.ceil(totalAct / 20);

  return (
    <div>
      <Caisses cass={result} user={user!} />
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search_date=${search_num}`} />
    </div>
  );
}