import { AuthUser } from "@/model/user";

type Props = { user: AuthUser };
export default function Avatar({ user }: Props) {
  const { image } = user;
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-10 h-10 rounded-full" src={image} alt="image" />
    </div>
  );
}
