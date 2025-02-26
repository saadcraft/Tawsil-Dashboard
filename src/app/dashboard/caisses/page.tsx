import type { Metadata } from "next";
import React from 'react'
import Caisses from "@/components/chef_app/caisses"
import { getCasses } from "@/lib/action_client";
import Pagination from "@/components/options/pagination";
import { getUser } from "@/lib/auth";
import { getAction } from "@/lib/actions";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Les caisses",
  description: "Tawsil Start Dashbord",
};

type props = {
  searchParams: Promise<{ page?: string, search_date?: string }>;
}

type ActionResult = { prixTotal: number };

export default async function CaissePage({ searchParams }: props) {

  const { page, search_date } = await searchParams;
  const pageNumber = page ?? "1";
  const search_num = search_date ?? "";

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = today.getFullYear();
  const searchDate = `${year}-${month}-${day}`;

  const cassesData = await getCasses({ page: pageNumber, search_date: search_num });

  if (!cassesData) notFound();

  const { result, totalAct } = cassesData;

  const totalPages = Math.ceil(totalAct / 20);

  const { prixTotal } = await getAction({ page: "", search: "", agent: "", date: searchDate }) as ActionResult;

  return (
    <div>
      <Caisses cass={result} total={prixTotal} />
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search_date=${search_num}`} />
    </div>
  );
}