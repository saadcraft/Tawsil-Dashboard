import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/dashboard";
import { GetStatic } from "@/lib/actions";
import { getUser } from "@/lib/auth";
import getMagasin from "@/lib/stores_api";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashbord",
  description: "Tawsil Start Dashbord",
};

export default async function DashbordPage() {

  const staticData = await GetStatic()
  const users = await getUser()

  let magasin: Magasin | null = null;
  if (users?.role == "partener") {
    magasin = await getMagasin()
    if (!magasin) notFound();
  }

  return (
    <div>
      <Dashboard magasin={magasin} data={staticData} user={users!} />
    </div>
  )
}
