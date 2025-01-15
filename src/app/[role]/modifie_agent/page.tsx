import type { Metadata } from "next";
import React from 'react'
import ModAgent from "@/components/chef_app/modifie_agent"
import { getAgents } from "@/lib/call_action";
import Pagination from "@/components/options/pagination"

export const metadata: Metadata = {
  title: "Modifié Agent",
  description: "Tawsil Start Dashbord",
};

type props = {
  searchParams: Promise<{ page?: string, search?: string }>;
}

export default async function ModyAgentPage({ searchParams }: props) {

  const { page, search } = await searchParams;
  const pageNumber = page ?? "1";
  const search_num = search ?? "";

  const { result, totalAct } = await getAgents({ page: pageNumber, search: search_num });

  const totalPages = Math.ceil(totalAct / 20);

  return (
    <div>
      <ModAgent results={result} />
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${search_num}`} />
    </div>
  );
}