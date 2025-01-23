import Magasin from '@/components/gestion_app/magasin'
import { getMagasin } from '@/lib/gestion_action'
import React from 'react'

export default async function GestionPage() {

    const result = await getMagasin()

    return (
        <Magasin allMagasin={result} />
    )
}
