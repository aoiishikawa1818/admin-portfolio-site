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
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken";
import { getHealth } from "../controllers/healthController";
import { getPortfolio } from "../controllers/portfolioController";

const router = Router();

router.get("/health", getHealth);
router.get("/portfolio", getPortfolio);
router.post("/contacts", postContact);
router.put("/admin/profile", verifyFirebaseToken, putAdminProfile);
router.post("/admin/works", verifyFirebaseToken, postAdminWork);
router.put("/admin/works/:id", verifyFirebaseToken, putAdminWork);
router.post("/admin/skills", verifyFirebaseToken, postAdminSkill);
router.put("/admin/skills/:id", verifyFirebaseToken, putAdminSkill);

export default router;
