import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/dashboard";

export const metadata: Metadata = {
  title: "Dashbord",
  description: "Tawsil Start Dashbord",
};

export default function DashbordPage() {

  return (
    <div>
      <Dashboard />
    </div>
  )
}
