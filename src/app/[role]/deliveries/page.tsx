import type { Metadata } from "next";
import React from 'react'
import Delivery from "@/components/menu_app/deliveries"
import { getCommand } from '@/lib/actions'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: "livraisons",
    description: "Tawsil Start Dashbord",
  };

  type props = {
    searchParams: { page?: string, client?: string, valide?: string};
}

export default async function DeliveryPage({ searchParams } : props) {

  const access = ((await cookies()).get('access_token'))?.value

  const { page , client, valide } = await searchParams;
  const pageNumber = page ?? "1";
  const client_num = client ?? "";
  const valide_payment = valide ?? "";
    
    const {result , totalAct} = await getCommand({ page: pageNumber, client: client_num , valide: valide_payment});

    const select = result.map(item => ({ ...item, selected: false }))

    const totalPages = Math.ceil(totalAct / 20);

    console.log("--------refresh------------")


  return (
        <div>
            <Delivery token={access!} promise={select} />
        </div>
  );
}