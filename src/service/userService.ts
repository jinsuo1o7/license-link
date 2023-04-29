import prisma from "../../lib/prisma";

type OAuthUser = {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
};

export async function createUserIfNotExists({
  id,
  name,
  email,
  image,
}: OAuthUser) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (user !== null) {
    return user;
  }

  return prisma.user.create({
    data: {
      id,
      name,
      email,
      image,
    },
  });
}
