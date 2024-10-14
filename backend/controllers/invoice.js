import Invoice from "../models/Invoice.js";

export const addInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    res.status(500).json({ error: "Failed to save invoice" });
  }
};
