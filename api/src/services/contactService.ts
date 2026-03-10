import prisma from "../lib/prisma";

type CreateContactInput = {
  name: string;
  email: string;
  message: string;
};

export const createContact = async ({
  name,
  email,
  message,
}: CreateContactInput) => {
  return prisma.contact.create({
    data: {
      name,
      email,
      message,
    },
  });
};
