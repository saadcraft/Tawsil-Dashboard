import AddSuperviseur from '@/components/gestion_app/add_super';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Ajouté Superviseur",
    description: "Tawsil Start Dashbord",
};

export default function AddSuperviseurPage() {
    return (
        <div>
            <AddSuperviseur />
        </div>
    )
}
