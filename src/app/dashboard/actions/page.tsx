import type { Metadata } from "next";
import React from 'react'
import Action from "@/components/chef_app/action"
import { getAction } from "@/lib/actions";
import Pagination from "@/components/options/pagination";


export const metadata: Metadata = {
  title: "Les Actions List",
  description: "Tawsil Start Dashbord",
};


type actionData = {
  result: Actions[];
  totalAct: number;
};

export default async function ActionPage({ searchParams }: { searchParams: Promise<{ page: string; search: string }> }) {

  const { page, search } = await searchParams;
  const pageNumber = page ?? "1";
  const searchNum = search ?? "";

  const { result, totalAct } = await getAction({ page: pageNumber, search: searchNum }) as unknown as actionData;

  const totalPages = Math.ceil(totalAct / 20);

  return (
    <div>
      <Action actions={result} />
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${searchNum}`} />
    </div>
  );
}