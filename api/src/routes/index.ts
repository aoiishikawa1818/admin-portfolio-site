import { Router } from "express";
import { putAdminProfile } from "../controllers/adminProfileController";
import {
  postAdminWork,
  putAdminWork,
} from "../controllers/adminWorkController";
import {
  postAdminSkill,
  putAdminSkill,
} from "../controllers/adminSkillController";
import { postContact } from "../controllers/contactController";
import { getHealth } from "../controllers/healthController";
import { getPortfolio } from "../controllers/portfolioController";

const router = Router();

router.get("/health", getHealth);
router.get("/portfolio", getPortfolio);
router.post("/contacts", postContact);
router.put("/admin/profile", putAdminProfile);
router.post("/admin/works", postAdminWork);
router.put("/admin/works/:id", putAdminWork);
router.post("/admin/skills", postAdminSkill);
router.put("/admin/skills/:id", putAdminSkill);

export default router;
