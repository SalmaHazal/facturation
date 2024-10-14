import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  client: {
    name: String,
    email: String,
    adresse: String,
  },
  entreprise: {
    name: String,
    email: String,
    adresse: String,
  },
  items: [
    {
      name: String,
      description: String,
      qty: Number,
      price: Number,
    },
  ],
  taxRate: Number,
  discountRate: Number,
  totalAmount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
