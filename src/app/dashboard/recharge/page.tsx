import Pagination from "@/components/options/pagination";
import Recharge from "@/components/superviseur/recharger";
import { DemandePerSuper } from "@/lib/super_action";
import { Metadata } from "next";
import { notFound } from "next/navigation";


export const metadata: Metadata = {
    title: "Demande",
    description: "Tawsil Start Dashbord",
};

type props = {
    searchParams: Promise<{ page?: string }>;
}

export default async function ApplePage({ searchParams }: props) {

    const { page } = await searchParams;
    const pageNumber = page ?? "1";

    const data = await DemandePerSuper({ page: pageNumber })

    if (!data) notFound()

    const { result, totalAct } = data

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <>
            <Recharge history={result} />
            <Pagination currentPage={Number(pageNumber)} pages={totalPages} params={""} />
        </>
    )
}