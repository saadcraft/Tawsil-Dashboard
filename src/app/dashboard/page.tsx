import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/dashboard";
import { GetStatic } from "@/lib/actions";
import { getUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashbord",
  description: "Tawsil Start Dashbord",
};

export default async function DashbordPage() {

  const staticData = await GetStatic()
  const users = await getUser()

  return (
    <div>
      <Dashboard data={staticData} user={users!} />
    </div>
  )
}
