import Reset from '@/components/auth/reset'
import React from 'react'
import { notFound } from 'next/navigation'
import { verifyChangeToken } from '@/lib/actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Reset password",
    description: "Tawsil Start Login",
};

type props = {
    searchParams: Promise<{ token?: string, uid?: string }>;
}

export default async function ResetPage({ searchParams }: props) {

    const { token, uid } = await searchParams;
    const tokenChange = token ?? "";
    const id = uid ?? "";

    if (!token || !uid) notFound()

    const verify = await verifyChangeToken({ token: tokenChange, uid: id })

    if (!verify) notFound()

    return (
        <div>
            <Reset token={tokenChange!} id={id!} />
        </div>
    )
}
