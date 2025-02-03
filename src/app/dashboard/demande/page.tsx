import Demande from "@/components/appel_app/demande";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Demande",
    description: "Tawsil Start Dashbord",
};

export default async function ApplePage() {
    return (
        <>
            <Demande />
        </>
    )
}