import type { Metadata } from "next";
import React from 'react'
import Delivery from "@/components/chef_app/deliveries"
import { getCommand } from '@/lib/actions'
import Pagination from "@/components/options/pagination";
import { getUser } from "@/lib/auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "livraisons",
  description: "Tawsil Start Dashbord",
};

type props = {
  searchParams: Promise<{ page?: string, livreur?: string, valide?: string }>;
}

export default async function DeliveryPage({ searchParams }: props) {

  const { page, livreur, valide } = await searchParams;
  const pageNumber = page ?? "1";
  const client_num = livreur ?? "";
  const valide_payment = valide ?? "";

  const data = await getCommand({ page: pageNumber, livreur: client_num, valide: valide_payment });

  if (!data) notFound()

  const { result, totalAct } = data

  const user = await getUser()

  const select = result.map(item => ({ ...item, selected: false }))

  const totalPages = Math.ceil(totalAct / 20);


  return (
    <div>
      <Delivery promise={select} users={user!} />
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`livreur=${client_num}&valide=${valide_payment}`} />
    </div>
  );
}