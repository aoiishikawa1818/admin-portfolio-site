import prisma from "../lib/prisma";

type SaveProfileInput = {
  name: string;
  bio: string;
  imageUrl: string;
};

export const saveProfile = async ({
  name,
  bio,
  imageUrl,
}: SaveProfileInput) => {
  const existingProfile = await prisma.profile.findFirst({
    orderBy: {
      id: "asc",
    },
  });

  if (existingProfile) {
    return prisma.profile.update({
      where: {
        id: existingProfile.id,
      },
      data: {
        name,
        bio,
        imageUrl,
      },
    });
  }

  return prisma.profile.create({
    data: {
      name,
      bio,
      imageUrl,
    },
  });
};
