import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get("access");

  if (!accessCookie?.value) {
    redirect("/");
  }

  return <>{children}</>;
}
