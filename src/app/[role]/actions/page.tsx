import type { Metadata } from "next";
import React from 'react'
import Action from "@/components/menu_app/action"
import { getAction } from "@/lib/actions";


export const metadata: Metadata = {
    title: "Les Actions List",
    description: "Tawsil Start Dashbord",
  };

  // type PageProps = {
  //   searchParams: {
  //     page?: string | undefined;
  //     search?: string | undefined;
  //   };
  // };

  type actionData = {
    result: Actions[];
    totalAct: number;
  };

export default async function ActionPage({ searchParams }: { searchParams : Promise<{page: string; search: string}>}) {

  const { page, search } = await searchParams;
  const pageNumber = page ?? "1";
  const searchNum = search ?? "";

  const { result } = await getAction({ page: pageNumber, search: searchNum }) as unknown as actionData;



  return (
        <div>
            <Action actions={result} />
        </div>
  );
}