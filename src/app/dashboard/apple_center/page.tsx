import type { Metadata } from "next";
import React from 'react'
import AppleCenter from "@/components/appel_app/apple_center"
import CenterChef from "@/components/chef_app/center_chef";
import { getParteners } from "@/lib/call_action";
import { getUser } from "@/lib/auth";
import { getChefCentre } from "@/lib/call_action";
import Pagination from "@/components/options/pagination";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Center d'apple",
  description: "Tawsil Start Dashbord",
};

type props = {
  searchParams: Promise<{ page?: string, search?: string }>;
}


export default async function ApplePage({ searchParams }: props) {

  const { page, search } = await searchParams;
  const pageNumber = page ?? "1";
  const search_num = search ?? "";

  const user = await getUser();

  let allChef;
  let results: Partenaire[] = [];
  let totalActs = 0;

  if (user?.role === "centre_appel" || user?.role === "admin") {

    const data = await getParteners({ page: pageNumber, search: search_num });

    if (!data) notFound()
    results = data.result
    totalActs = data.totalAct

  } else {

    const data = await getChefCentre({ page: pageNumber, search: search_num });

    if (!data) notFound()
    results = data.result
    totalActs = data.totalAct

  }

  const totalPages = Math.ceil(totalActs / 20);


  return (
    <div>
      {user?.role === "centre_appel" || user?.role === "admin" ? <AppleCenter parteners={results} chefs={allChef!} /> : <CenterChef parteners={results} />}
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${search_num}`} />
    </div>
  );
}
