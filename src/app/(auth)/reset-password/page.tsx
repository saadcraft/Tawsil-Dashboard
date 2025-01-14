import Reset from '@/components/auth/reset'
import React from 'react'

type props = {
    searchParams: Promise<{ token?: string, uid?: string }>;
}

export default async function ResetPage({ searchParams }: props) {

    const { token, uid } = await searchParams;
    const tokenChange = token ?? "";
    const id = uid ?? "";
    return (
        <div>
            <Reset token={tokenChange!} id={id!} />
        </div>
    )
}
