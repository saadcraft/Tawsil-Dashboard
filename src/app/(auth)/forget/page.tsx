import type { Metadata } from "next";
import React from 'react'
import Forget from '@/components/auth/forget'
import ClientOnly from "@/components/providers/clientOnly";

export const metadata: Metadata = {
  title: "Forget password",
  description: "Tawsil Start Login",
};

export default function ForgetPage() {
  return (
    <div>
      <Forget />
    </div>
  )
}
