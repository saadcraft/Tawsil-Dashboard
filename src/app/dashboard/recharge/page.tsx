import Recharge from "@/components/superviseur/recharger";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Demande",
    description: "Tawsil Start Dashbord",
};

export default async function ApplePage() {
    return (
        <>
            <Recharge />
        </>
    )
}