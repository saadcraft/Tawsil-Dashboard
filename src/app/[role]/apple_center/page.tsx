import type { Metadata } from "next";
import React from 'react'
import AppleCenter from "@/components/menu_app/apple_center"

export const metadata: Metadata = {
    title: "Center d'apple",
    description: "Tawsil Start Dashbord",
  };

export default function ApplePage() {
  return (
        <div>
            <AppleCenter />
        </div>
  );
}
