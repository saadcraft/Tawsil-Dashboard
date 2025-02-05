import React from "react"

type props = {
    title: string;
    value: string;
    icon: React.ReactNode;
}

export function StatsCard({ title, value, icon }: props) {
    return (
        <div className="max-w-sm rounded-xl transition-all duration-200 border gradient-border cursor-pointer overflow-hidden shadow-lg bg-gradient-to-r from-fourth to-third text-white p-6 m-4 hover:scale-105">
            <div className="font-bold text-xl mb-2">{icon}</div>
            <div className="text-gray-300 text-base">
                <p>{title}</p>
                <p className="mt-2"><span className="font-semibold">{value} Users</span></p>
            </div>
        </div>
    )
}

