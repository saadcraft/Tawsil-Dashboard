import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/dashboard";
import { GetStatic } from "@/lib/actions";
import { staticCommande, staticVTC } from "@/lib/comptable_action";
// import { getCategories } from "@/lib/stores_api";

export const metadata: Metadata = {
  title: "Dashbord",
  description: "Tawsil Start Dashbord",
};

export default async function DashbordPage() {

  const staticData = await GetStatic()
  const StaticCommande = await staticCommande({ month: "", anne: "", paye: "" }) as Chart[]
  const StaticCourse = await staticVTC({ month: "", anne: "", paye: "" }) as Chart[]
  // const categories = await getCategories()

  return (
    <div>
      <Dashboard data={staticData} dataStatic={StaticCommande} vtcStatic={StaticCourse} />
    </div>
  )
}
