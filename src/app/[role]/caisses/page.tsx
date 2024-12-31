import type { Metadata } from "next";
import React from 'react'
import Caisses from "@/components/menu_app/caisses"
import { cookies } from 'next/headers'
import { getCasses } from "@/lib/action_client";

export const metadata: Metadata = {
    title: "Les caisses",
    description: "Tawsil Start Dashbord",
  };

export default async function CaissePage() {

  const access = ((await cookies()).get('access_token'))?.value

  const casses = await getCasses();

  return (
        <div>
            <Caisses token={access!} cass={casses} />
        </div>
  );
}