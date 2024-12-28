import type { Metadata } from "next";
import React from 'react'
import Delivery from "@/components/menu_app/deliveries"
import { getCommand } from '@/lib/actions'

export const metadata: Metadata = {
    title: "livraisons",
    description: "Tawsil Start Dashbord",
  };

  type props = {
    searchParams: { page?: string };
}

export default async function DeliveryPage({ searchParams } : props) {

  const { page } = await searchParams;
  const pageNumber = page ?? "1";
    
    const {result , totalAct} = await getCommand({ page: pageNumber });

    const select = result.map(item => ({ ...item, selected: false }))

    const totalPages = Math.ceil(totalAct / 20);


  return (
        <div>
            <Delivery promise={select} />
        </div>
  );
}