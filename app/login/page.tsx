import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const user = await getAuthUser();
  if (user) {
    redirect(user.role === "staff" ? "/staff" : "/judge");
  }

  return <LoginForm />;
}
