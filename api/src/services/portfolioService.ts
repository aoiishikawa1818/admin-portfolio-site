import prisma from "../lib/prisma";

export const getPortfolioData = async () => {
  const profile = await prisma.profile.findFirst({
    orderBy: {
      id: "asc",
    },
  });

  const works = await prisma.work.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  const skills = await prisma.skill.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  return {
    profile,
    works,
    skills,
  };
};
