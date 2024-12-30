import type { Metadata } from "next";
import React from 'react'
import AppleCenter from "@/components/menu_app/apple_center"
import { getParteners } from "@/lib/actions";
import { Partner } from '@/lib/type_module/center_type'

export const metadata: Metadata = {
    title: "Center d'apple",
    description: "Tawsil Start Dashbord",
  };

export default async function ApplePage() {

  const result = await getParteners();


  return (
        <div>
            <AppleCenter parteners={result} />
        </div>
  );
}
