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
  searchParams: Promise<{ page?: string, search_date?: string }>;
}

export default async function CaissePage({ searchParams }: props) {

  const { page, search_date } = await searchParams;
  const pageNumber = page ?? "1";
  const search_num = search_date ?? "";

  const { result, totalAct } = await getCasses({ page: pageNumber, search_date: search_num });

  const totalPages = Math.ceil(totalAct / 20);

  return (
    <div>
      <Caisses cass={result} />
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} param1={`search_date=${search_num}`} param2={``} />
    </div>
  );
}