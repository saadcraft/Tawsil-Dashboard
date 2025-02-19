import Magasin from '@/components/gestion_app/magasin'
import { getTypeMagasin } from '@/lib/gestion_action'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function GestionPage() {

    const result = await getTypeMagasin()

    if (!result) notFound()

    return (
        <Magasin allMagasin={result} />
    )
}
