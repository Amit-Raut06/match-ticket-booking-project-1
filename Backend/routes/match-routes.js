import express from "express";
import {
  addMatch,
  getAllMatches,
  getMatchById,
} from "../controllers/match-controller";
const matchRouter = express.Router();
matchRouter.get("/", getAllMatches);
matchRouter.get("/:id", getMatchById);
matchRouter.post("/", addMatch);

export default matchRouter;
