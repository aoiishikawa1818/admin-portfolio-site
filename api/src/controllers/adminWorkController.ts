import type { Request, Response } from "express";
import { createWork, updateWork } from "../services/adminWorkService";

export const postAdminWork = async (req: Request, res: Response) => {
  const { title, description, url, imageUrl, sortOrder } = req.body;

  if (!title || !description || !url || !imageUrl || sortOrder === undefined) {
    return res.status(400).json({
      message: "title, description, url, imageUrl, sortOrder are required",
    });
  }

  const work = await createWork({
    title,
    description,
    url,
    imageUrl,
    sortOrder,
  });

  res.status(201).json({
    message: "Work created",
    work,
  });
};

export const putAdminWork = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description, url, imageUrl, sortOrder } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "valid id is required",
    });
  }

  if (!title || !description || !url || !imageUrl || sortOrder === undefined) {
    return res.status(400).json({
      message: "title, description, url, imageUrl, sortOrder are required",
    });
  }

  const work = await updateWork(id, {
    title,
    description,
    url,
    imageUrl,
    sortOrder,
  });

  res.json({
    message: "Work updated",
    work,
  });
};
