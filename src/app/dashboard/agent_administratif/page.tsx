import type { Metadata } from "next";
import React from 'react'
import ModAgent from "@/components/chef_app/modifie_agent"
import { getAgents } from "@/lib/call_action";
import Pagination from "@/components/options/pagination"
import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth";
import { getAllAgent } from "@/lib/gestion_action";
import ShowAgent from "@/components/gestion_app/show_agent";

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

  const user = await getUser();

  let agents = null

  if (user.role === "chef_bureau") {
    agents = await getAgents({ page: pageNumber, search: search_num });
  }
  else if (user.role === "gestion_commercial") {
    agents = await getAllAgent({ role: "agent_administratif", page: pageNumber, search: search_num, wilaya: location, groupe: chef })
  }

  if (!agents) notFound();
  const { result, totalAct } = agents;

  const totalPages = Math.ceil(totalAct / 20);

  return (
    <div>
      {user.role === "chef_bureau" ? <ModAgent results={result} /> : <ShowAgent results={result} />}
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${search_num}`} />
    </div>
  );
}