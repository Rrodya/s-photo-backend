import { Router } from "express";

const router = Router();

router.get("/posts", (req, res) => {
  console.log(req);
})