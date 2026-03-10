import { Router } from "express";
import { postContact } from "../controllers/contactController";
import { getHealth } from "../controllers/healthController";
import { getPortfolio } from "../controllers/portfolioController";

const router = Router();

router.get("/health", getHealth);
router.get("/portfolio", getPortfolio);
router.post("/contacts", postContact);

export default router;
