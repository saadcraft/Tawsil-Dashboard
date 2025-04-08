import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/dashboard";
import { GetStatic } from "@/lib/actions";
import { staticCommande } from "@/lib/comptable_action";
// import { getCategories } from "@/lib/stores_api";

export const metadata: Metadata = {
  title: "Dashbord",
  description: "Tawsil Start Dashbord",
};

export default async function DashbordPage() {

  const staticData = await GetStatic()
  const StaticCommande = await staticCommande({ mounth: "", anne: "", paye: "" }) as { date: string, count: string }[]
  // const categories = await getCategories()

  return (
    <div>
      <Dashboard data={staticData} dataStatic={StaticCommande} />
    </div>
  )
}
