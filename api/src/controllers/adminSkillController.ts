import type { Request, Response } from "express";
import { createSkill, updateSkill } from "../services/adminSkillService";

export const postAdminSkill = async (req: Request, res: Response) => {
  const { name, level, sortOrder } = req.body;

  if (!name || level === undefined || sortOrder === undefined) {
    return res.status(400).json({
      message: "name, level, sortOrder are required",
    });
  }

  const skill = await createSkill({
    name,
    level,
    sortOrder,
  });

  res.status(201).json({
    message: "Skill created",
    skill,
  });
};

export const putAdminSkill = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, level, sortOrder } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "valid id is required",
    });
  }

  if (!name || level === undefined || sortOrder === undefined) {
    return res.status(400).json({
      message: "name, level, sortOrder are required",
    });
  }

  const skill = await updateSkill(id, {
    name,
    level,
    sortOrder,
  });

  res.json({
    message: "Skill updated",
    skill,
  });
};
