import type { Request, Response } from "express";
import { createContact } from "../services/contactService";

export const postContact = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "name, email, message are required",
    });
  }

  const contact = await createContact({ name, email, message });

  res.status(201).json({
    message: "Contact created",
    contact,
  });
};
