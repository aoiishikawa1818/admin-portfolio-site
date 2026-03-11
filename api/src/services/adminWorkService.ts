import prisma from "../lib/prisma";

type SaveWorkInput = {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  sortOrder: number;
};

export const createWork = async ({
  title,
  description,
  url,
  imageUrl,
  sortOrder,
}: SaveWorkInput) => {
  return prisma.work.create({
    data: {
      title,
      description,
      url,
      imageUrl,
      sortOrder,
    },
  });
};

export const updateWork = async (
  id: number,
  { title, description, url, imageUrl, sortOrder }: SaveWorkInput,
) => {
  return prisma.work.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      url,
      imageUrl,
      sortOrder,
    },
  });
};
