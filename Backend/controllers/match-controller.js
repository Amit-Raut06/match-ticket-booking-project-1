import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import Match from "../models/Match";
export const addMatch = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new match
  const { title, description, releaseDate, posterUrl } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() == "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let match;
  try {
    match = new Match({
      description,
      releaseDate: new Date(`${releaseDate}`),
      admin: adminId,
      posterUrl,
      title,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }
    session.startTransaction();
    await match.save({ session });
    adminUser.addedMatches.push(match);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!match) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ match });
};

export const getAllMatches = async (req, res, next) => {
  let matches;

  try {
    matches = await Match.find();
  } catch (err) {
    return console.log(err);
  }

  if (!matches) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ matches });
};

export const getMatchById = async (req, res, next) => {
  const id = req.params.id;
  let match;
  try {
    match = await Match.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!match) {
    return res.status(404).json({ message: "Invalid match ID" });
  }

  return res.status(200).json({ match });
};
