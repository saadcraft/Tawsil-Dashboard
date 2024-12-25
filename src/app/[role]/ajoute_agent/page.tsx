import type { Metadata } from "next";
import React from 'react'
import AjouteAgent from "@/components/menu_app/ajoute_agent"
import { cookies } from 'next/headers'


export const metadata: Metadata = {
    title: "Ajouté agent",
    description: "Tawsil Start Dashbord",
  };

export default async function AjoutAgentPage() {

  const access = ((await cookies()).get('access_token'))?.value

  return (
        <div>
            <AjouteAgent token={access!} />
        </div>
  );
}