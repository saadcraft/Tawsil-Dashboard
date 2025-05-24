import type { Metadata } from "next";
import Login from "@/components/auth/login";
import ClientOnly from "@/components/providers/clientOnly";

export const metadata: Metadata = {
  title: "Login",
  description: "Tawsil Start Login",
};

export default function LoginPage() {
  return (
    <div>
      <Login />
    </div>
  )
}
