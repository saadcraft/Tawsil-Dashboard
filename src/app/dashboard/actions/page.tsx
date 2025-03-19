import type { Metadata } from "next";
import React from 'react'
import Action from "@/components/chef_app/action"
import { getAction } from "@/lib/actions";
import Pagination from "@/components/options/pagination";
import { getAgents } from "@/lib/call_action";
import { notFound } from "next/navigation";


export const metadata: Metadata = {
  title: "Les Actions List",
  description: "Tawsil Start Dashbord",
};


type actionData = {
  result: Actions[];
  totalAct: number;
  prixTotal: number;
};

type Agents = {
  result: Users[];
}

export default async function ActionPage({ searchParams }:
  { searchParams: Promise<{ page: string; search: string, agent: string, date: string }> }) {

  const { page, search, agent, date } = await searchParams;
  const pageNumber = page ?? "1";
  const searchNum = search ?? "";
  const searchAgent = agent ?? "";
  const searchDate = date ?? "";

  const data = await getAction({ page: pageNumber, search: searchNum, agent: searchAgent, date: searchDate }) as unknown as actionData;

  if (!data) notFound();

  const { result, totalAct, prixTotal } = data;

  const totalPages = Math.ceil(totalAct / 20);

  const Allagent = await getAgents({ page: "", search: "" }) as unknown as Agents;

  return (
    <div>
      <Action actions={result} agents={Allagent} total={prixTotal} />
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`?search=${searchNum}&agent=${searchAgent}&date=${searchDate}`} />
    </div>
  );
}