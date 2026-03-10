import type { Request, Response } from "express";
import { getPortfolioData } from "../services/portfolioService";

export const getPortfolio = async (_req: Request, res: Response) => {
  const portfolio = await getPortfolioData();
  res.json(portfolio);
};
