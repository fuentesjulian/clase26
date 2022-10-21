import express from "express";
const router = express.Router();
import * as fakeProdApi from "../api/fakeProds.js";
export default router.get("/", (req, res) => {
  const fakeProds = fakeProdApi.generateMany(5);
  res.send(fakeProds);
});
