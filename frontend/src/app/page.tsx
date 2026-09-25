import { LoginView } from "@/Views";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get("access");

  if (accessCookie?.value) {
    redirect("/dashboard");
  }

  return (
    <LoginView />
  );
}

