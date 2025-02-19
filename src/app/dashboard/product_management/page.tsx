import React from 'react'
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Products from '@/components/magasin_app/products';
import getMagasin, { getCategories, getProducts } from '@/lib/stores_api';
import Pagination from '@/components/options/pagination';

export const metadata: Metadata = {
    title: "Gestion produit",
    description: "Tawsil Start Dashbord",
};

type props = {
    searchParams: Promise<{ page?: string, category?: string, name?: string }>;
}

export default async function ProductPage({ searchParams }: props) {

    const { page, category, name } = await searchParams;
    const pageNumber = page ?? "1";
    const cat = category ?? "";
    const productNmae = name ?? "";

    const magasin = await getMagasin()

    const categories = await getCategories()

    if (!magasin) notFound();

    const products = await getProducts(magasin.id, { page: pageNumber, catalogue: cat, name: productNmae });

    if (!products) notFound();

    const { result, totalAct } = products;

    const totalPages = Math.ceil(totalAct / 20);

    return (
        <div>
            <Products products={result} cat={categories!} magasin={magasin} />
            <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`category=${cat}&name=${productNmae}`} />
        </div>
    )
}
