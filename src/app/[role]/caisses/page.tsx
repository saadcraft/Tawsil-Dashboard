import type { Metadata } from "next";
import React from 'react'
import Caisses from "@/components/menu_app/caisses"
import { getCasses } from "@/lib/action_client";
import Pagination from "@/components/options/pagination";

export const metadata: Metadata = {
  title: "Les caisses",
  description: "Tawsil Start Dashbord",
};

type props = {
  searchParams: Promise<{ page?: string, search?: string }>;
}

export default async function CaissePage({ searchParams }: props) {

  const { page, search } = await searchParams;
  const pageNumber = page ?? "1";
  const search_num = search ?? "";

  const { result, totalAct } = await getCasses({ page: pageNumber, search: search_num });

  const totalPages = Math.ceil(totalAct / 20);

  return (
    <div>
      <Caisses cass={result} />
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} param1={`search=${search_num}`} param2={``} />
    </div>
  );
}