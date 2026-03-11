import type { Request, Response } from "express";
import { saveProfile } from "../services/adminProfileService";

export const putAdminProfile = async (req: Request, res: Response) => {
  const { name, bio, imageUrl } = req.body;

  if (!name || !bio || !imageUrl) {
    return res.status(400).json({
      message: "name, bio, imageUrl are required",
    });
  }

  const profile = await saveProfile({ name, bio, imageUrl });

  res.json({
    message: "Profile saved",
    profile,
  });
};
