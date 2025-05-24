import type { Metadata } from "next";
import Register from "@/components/auth/register";

export const metadata: Metadata = {
    title: "Register",
    description: "Tawsil Start Register",
};

export default function LoginPage() {
    return (
        <div>
            <Register />
        </div>
    )
}