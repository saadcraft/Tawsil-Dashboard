import React from 'react'
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import getMagasin, { getCommande } from '@/lib/stores_api';
import Pagination from '@/components/options/pagination';
import Commande from '@/components/magasin_app/commandes';

export const metadata: Metadata = {
    title: "Commandes",
    description: "Tawsil Start Dashbord",
};

type props = {
    searchParams: Promise<{ page?: string, etat?: string, id?: string }>;
}

export default async function ProductPage({ searchParams }: props) {

    const { page, etat, id } = await searchParams;
    const pageNumber = page ?? "1";
    const cat = etat ?? "";
    const com_id = id ?? "";

    const magasin = await getMagasin()

    // const categories = await getCategories()

    if (!magasin) notFound();

    const commande = await getCommande(magasin.id, { page: pageNumber, etat: cat, id: com_id });

    if (!commande) notFound();

    const { result, totalAct } = commande;

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <div>
            <Commande commande={result} magasin={magasin} />
            <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`status=${cat}`} />
        </div>
    )
}
