import Vtc from '@/components/gestion_app/vtc';
import { getCourses } from '@/lib/gestion_action';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "livraisons",
    description: "Tawsil Start Dashbord",
  };

  type props = {
    searchParams: Promise<{ page?: string, search?: string, valide?: string }>;
  }

export default async function CoursesPage({searchParams} : props) {

    const { page, search, valide } = await searchParams;
    const pageNumber = page ?? "1";
    const client_num = search ?? "";
    const valide_payment = valide ?? "";

    const { result, totalAct } = await getCourses({page: pageNumber, search: client_num,valide: valide_payment })

    const select = result.map(item => ({ ...item, selected: false }))

  return (
    <div>
        <Vtc promise={select} />
    </div>
  )
}
