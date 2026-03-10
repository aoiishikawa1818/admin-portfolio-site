import type { Request, Response } from "express";
import { buildHealthResponse } from "../services/healthService";

export const getHealth = (_req: Request, res: Response) => {
  const response = buildHealthResponse();
  res.json(response);
};
