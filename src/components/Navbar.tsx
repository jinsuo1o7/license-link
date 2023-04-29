"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "@/components/Avatar";

const paths = [
  { path: "/community", title: "Community" },
  { path: "/license", title: "License" },
];
export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const curPath = usePathname();
  return (
    <header className="flex items-center justify-between p-4 sticky top-0 border-b">
      <Link href={"/"} className="text-3xl">
        <Logo />
      </Link>
      <ul className="flex items-center gap-4">
        {paths.map(({ path, title }) => (
          <li key={path}>
            <Link
              href={path}
              className={curPath === path ? "text-white bg-black" : ""}
            >
              {title}
            </Link>
          </li>
        ))}
        <li>
          {user && (
            <Link href={"/my"}>
              <Avatar user={user} />
            </Link>
          )}
        </li>
        <li>{user && <button onClick={() => signOut()}>Sign Out</button>}</li>
        <li>{!user && <button onClick={() => signIn()}>Sign In</button>}</li>
      </ul>
    </header>
  );
}
