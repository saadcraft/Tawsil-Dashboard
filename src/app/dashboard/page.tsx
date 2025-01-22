import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/dashboard";
import { GetStatic } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Dashbord",
  description: "Tawsil Start Dashbord",
};

export default async function DashbordPage() {

  const staticData = await GetStatic()

  return (
    <div>
      <Dashboard data={staticData} />
    </div>
  )
}
