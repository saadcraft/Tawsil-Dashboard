import type { Metadata } from "next";
import React from 'react'
import ModAgent from "@/components/menu_app/modifie_agent"
import { getAgents } from "@/lib/call_action";

export const metadata: Metadata = {
    title: "Modifié Agent",
    description: "Tawsil Start Dashbord",
  };

  type props = {
    searchParams: Promise<{ page?: string, search?: string, valide?: string}>;
}

export default async function AjoutAgentPage({ searchParams } : props) {
  
  const { page , search } = await searchParams;
  const pageNumber = page ?? "1";
  const search_num = search ?? "";

  const { result } = await getAgents({ page : pageNumber , search: search_num });

  return (
        <div>
            <ModAgent results={result} />
        </div>
  );
}