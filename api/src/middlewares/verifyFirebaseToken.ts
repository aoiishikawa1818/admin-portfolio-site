import { NextFunction, Request, Response } from "express";
import { adminAuth } from "../lib/firebaseAdmin";

export const verifyFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "認証が必要です。",
    });
  }

  const idToken = authorizationHeader.replace("Bearer ", "");

  try {
    await adminAuth.verifyIdToken(idToken);
    next();
  } catch {
    return res.status(401).json({
      message: "認証が必要です。",
    });
  }
};
