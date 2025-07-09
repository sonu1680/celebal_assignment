import express, { Request, Response } from "express";
import { User } from "../model/userModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err });
  }
});

router.get("/", async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Error updating user", error: err });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("User not found");
    res.send("User deleted");
  } catch (err) {
    res.status(400).json({ message: "Error deleting user", error: err });
  }
});

export default router;
