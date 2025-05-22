import type { Metadata } from "next";
import React from 'react'
import ClientAgent from "@/components/clinet_ajent";

export const metadata: Metadata = {
  title: "Modifié Agent",
  description: "Tawsil Start Dashbord",
};

type props = {
  searchParams: Promise<{ page?: string, search?: string, wilaya?: string, groupe?: string }>;
}

export default async function ModyAgentPage({ searchParams }: props) {

  const { page, search, wilaya, groupe } = await searchParams;
  const pageNumber = page ?? "1";
  const search_num = search ?? "";
  const location = wilaya ?? "";
  const chef = groupe ?? "";

  // const user = await getUser();

  // let agents = null

  // if (user) {
  //   if (user.role === "chef_bureau") {
  //     agents = await getAgents({ page: pageNumber, search: search_num });
  //   }
  //   else if (user.role === "gestion_commercial") {
  //     agents = await getAllAgent({ role: "agent_administratif", page: pageNumber, search: search_num, wilaya: location, groupe: chef })
  //   }
  // }

  // if (!agents) notFound();
  // const { result, totalAct } = agents;

  // const totalPages = Math.ceil(totalAct / 20);

  return (
    <div>
      <ClientAgent groupe={chef} page={pageNumber} search={search_num} wilaya={location} />
    </div>
  );
}