import ClientAppel from "@/components/client_appel";
import type { Metadata } from "next";
import React from 'react'
// import AppleCenter from "@/components/appel_app/apple_center"
// import CenterChef from "@/components/chef_app/center_chef";
// import { getParteners } from "@/lib/call_action";
// import { getUser } from "@/lib/auth";
// import { getChefCentre } from "@/lib/call_action";
// import Pagination from "@/components/options/pagination";
// import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Center d'apple",
  description: "Tawsil Start Dashbord",
};

type props = {
  searchParams: Promise<{ page?: string, search?: string, groupe?: string }>;
}


export default async function ApplePage({ searchParams }: props) {

  const { page, search, groupe } = await searchParams;
  const pageNumber = page ?? "1";
  const search_num = search ?? "";
  const Checkgroupe = groupe ?? "";


  return (
    <div>
      <ClientAppel page={pageNumber} search={search_num} groupe={Checkgroupe} />
    </div>
  );
}
