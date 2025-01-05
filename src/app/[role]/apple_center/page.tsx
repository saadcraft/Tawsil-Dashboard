import type { Metadata } from "next";
import React from 'react'
import AppleCenter from "@/components/menu_app/apple_center"
import CenterChef from "@/components/menu_app/center_chef";
import { getParteners } from "@/lib/actions";
import { getUser } from "@/lib/auth";
import { getAllChef, getChefCentre } from "@/lib/call_action";

export const metadata: Metadata = {
    title: "Center d'apple",
    description: "Tawsil Start Dashbord",
  };

export default async function ApplePage() {

  const result = await getParteners();

  const user = await getUser();

  let allChef;

  if(user?.role === "centre_appel" || user?.role === "admin"){
  
    allChef = await getAllChef();

  }
  
  const chef = await getChefCentre();


  return (
        <div>
          {user?.role === "centre_appel" || user?.role === "admin" ? <AppleCenter parteners={result} chefs={allChef!} /> : <CenterChef parteners={chef} />}
        </div>
  );
}
