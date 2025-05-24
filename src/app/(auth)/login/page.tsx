import type { Metadata } from "next";
import Login from "@/components/auth/login";

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
