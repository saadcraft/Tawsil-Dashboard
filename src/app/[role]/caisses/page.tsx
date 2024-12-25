import type { Metadata } from "next";
import React from 'react'
import Caisses from "@/components/menu_app/caisses"

export const metadata: Metadata = {
    title: "Les caisses",
    description: "Tawsil Start Dashbord",
  };

export default function CaissePage() {
  return (
        <div>
            <Caisses />
        </div>
  );
}