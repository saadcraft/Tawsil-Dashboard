import Vtc from '@/components/gestion_app/vtc';
import Pagination from '@/components/options/pagination';
import { getCourses } from '@/lib/gestion_action';
import { Metadata } from 'next';
import React from 'react'
// import useStore from '@/components/providers/SessionProvider'
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: "livraisons",
  description: "Tawsil Start Dashbord",
};

type props = {
  searchParams: Promise<{ page?: string, search?: string, valide?: string, wilaya?: string }>;
}

export default async function CoursesPage({ searchParams }: props) {

  const { page, search, valide, wilaya } = await searchParams;
  const pageNumber = page ?? "1";
  const client_num = search ?? "";
  const valide_payment = valide ?? "";
  const city = wilaya ?? "";

  const data = await getCourses({ page: pageNumber, search: client_num, valide: valide_payment, wilaya: city })

  if (!data) notFound()

  const { result, totalAct } = data

  const select = result.map(item => ({ ...item, selected: false }))

  const totalPages = Math.ceil(totalAct / 20);

  return (
    <div>
      <Vtc promise={select} />
      <Pagination pages={totalPages} currentPage={Number(pageNumber)} params={`search=${client_num}&valide=${valide_payment}&wilaya=${city}`} />
    </div>
  )
}
