"use client";
import { signIn } from "next-auth/react";

type Props = {
  id: string;
  name: string;
  callbackUrl: string;
};
export default function SingInButton({ id, name, callbackUrl }: Props) {
  return (
    <div>
      <div onClick={() => signIn(id, { callbackUrl })}>Sign in with {name}</div>
    </div>
  );
}
