import express from "express";
import { addInvoice } from "../controllers/invoice.js";

const router = express.Router();

router.post("/", addInvoice);

export default router;