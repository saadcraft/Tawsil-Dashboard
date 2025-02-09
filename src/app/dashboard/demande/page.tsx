import Demande from "@/components/appel_app/demande";
import Pagination from "@/components/options/pagination";
import { allDemandes } from "@/lib/super_action";
import { Metadata } from "next";
import { notFound } from "next/navigation";


export const metadata: Metadata = {
    title: "Demande",
    description: "Tawsil Start Dashbord",
};

type props = {
    searchParams: Promise<{ page?: string, date: string, etat: string, search: string }>;
}

export default async function ApplePage({ searchParams }: props) {

    const { page, date, etat, search } = await searchParams;
    const pageNumber = page ?? "1";
    const searchNum = search ?? "";
    const searchEtat = etat ?? "";
    const searchDate = date ?? "";

    const data = await allDemandes({ page: pageNumber, date: searchDate, etat: searchEtat, search: searchNum })

    if (!data) notFound()

    const { result, totalAct } = data

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <>
            <Demande dm={result} />
            <Pagination currentPage={Number(pageNumber)} pages={totalPages} params={""} />
        </>
    )
}