import Magasin from '@/components/gestion_app/magasin'
import { getMagasin } from '@/lib/actions'
import React from 'react'

export default async function GestionPage() {

    const result = await getMagasin()

    console.log(result)

    return (
        <Magasin allMagasin={result} />
    )
}
