import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  deleteUserById,
  deleteUserByEmail,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", createUser);

router.get("/:id", getUser);

router.delete("/:id", deleteUserById);

router.delete("/deletebyemail/:email", deleteUserByEmail);

router.put("/:id", updateUser);

export default router;
