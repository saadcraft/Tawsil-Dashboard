import type { Metadata } from "next";
import React from 'react'
import AppleCenter from "@/components/menu_app/apple_center"
import CenterChef from "@/components/menu_app/center_chef";
import { getParteners } from "@/lib/call_action";
import { getUser } from "@/lib/auth";
import { getAllChef, getChefCentre } from "@/lib/call_action";
import Pagination from "@/components/options/pagination";

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

  let totalPages;

  const user = await getUser();

  let allChef;
  let results: Partenaire[] = [];
  let totalActs = 0;

  if (user?.role === "centre_appel" || user?.role === "admin") {

    const { result, totalAct } = await getParteners({ page: pageNumber, search: search_num });

    allChef = await getAllChef();

    results = result
    totalActs = totalAct

  } else {

    const { result, totalAct } = await getChefCentre({ page: pageNumber, search: search_num });

    results = result
    totalActs = totalAct

  }

  totalPages = Math.ceil(totalActs / 20);



  return (
    <div>
      {user?.role === "centre_appel" || user?.role === "admin" ? <AppleCenter parteners={results} chefs={allChef!} /> : <CenterChef parteners={results} />}
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} param1={`search=${search_num}`} param2={``} />
    </div>
  );
}
