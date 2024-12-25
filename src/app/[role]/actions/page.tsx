import type { Metadata } from "next";
import React from 'react'
import Action from "@/components/menu_app/action"

export const metadata: Metadata = {
    title: "Les Actions List",
    description: "Tawsil Start Dashbord",
  };

export default function ActionPage() {
  return (
        <div>
            <Action />
        </div>
  );
}