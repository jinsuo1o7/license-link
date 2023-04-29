import { ClientSafeProvider, LiteralUnion } from "next-auth/src/react/types";
import { BuiltInProviderType } from "next-auth/src/providers";
import SignInButton from "@/components/SignInButton";

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
  callbackUrl: string;
};
export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <div>
      {Object.values(providers).map(({ name, id }) => (
        <SignInButton key={id} id={id} name={name} callbackUrl={callbackUrl} />
      ))}
    </div>
  );
}
