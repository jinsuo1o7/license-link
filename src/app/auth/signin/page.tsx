import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import SignIn from "@/components/SignIn";

type Props = { searchParams: { callbackUrl: string } };
export default async function Page({ searchParams: { callbackUrl } }: Props) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  const providers = await getProviders();

  if (providers == null) {
    return <div>No Provider</div>;
  }
  return <SignIn providers={providers} callbackUrl={callbackUrl} />;
}
