import type { Metadata } from "next";
import React from 'react'
import ModAgent from "@/components/menu_app/modifie_agent"

export const metadata: Metadata = {
    title: "Modifié Agent",
    description: "Tawsil Start Dashbord",
  };

export default function AjoutAgentPage() {
  return (
        <div>
            <ModAgent />
        </div>
  );
}