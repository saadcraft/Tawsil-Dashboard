import Profile from "@/components/profile/profile";
import type { Metadata } from "next";
import React from 'react'

export const metadata: Metadata = {
    title: "Profile",
    description: "Tawsil Start Dashbord",
};

export default async function page() {

    return (
        <Profile />
    )
}
