import type { Metadata } from "next";
import React from 'react'
import Delivery from "@/components/menu_app/deliveries"

export const metadata: Metadata = {
    title: "livraisons",
    description: "Tawsil Start Dashbord",
  };

export default function DeliveryPage() {
  return (
        <div>
            <Delivery />
        </div>
  );
}