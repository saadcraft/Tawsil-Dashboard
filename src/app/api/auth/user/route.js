"use server";

import { apiRequest } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/user",
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}