import type { Metadata } from "next";
import React from 'react'
import Caisses from "@/components/menu_app/caisses"
import { getCasses } from "@/lib/action_client";

export const metadata: Metadata = {
    title: "Les caisses",
    description: "Tawsil Start Dashbord",
  };

export default async function CaissePage() {

  const casses = await getCasses();

  return (
        <div>
            <Caisses cass={casses} />
        </div>
  );
}