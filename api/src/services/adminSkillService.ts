import prisma from "../lib/prisma";

type SaveSkillInput = {
  name: string;
  level: number;
  sortOrder: number;
};

export const createSkill = async ({
  name,
  level,
  sortOrder,
}: SaveSkillInput) => {
  return prisma.skill.create({
    data: {
      name,
      level,
      sortOrder,
    },
  });
};

export const updateSkill = async (
  id: number,
  { name, level, sortOrder }: SaveSkillInput,
) => {
  return prisma.skill.update({
    where: {
      id,
    },
    data: {
      name,
      level,
      sortOrder,
    },
  });
};
