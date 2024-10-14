import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Invoice = () => {
  const [client, setClient] = useState([{ name: "", email: "", adresse: "" }]);
  const [entreprise, setEntreprise] = useState([
    { name: "", email: "", adresse: "" },
  ]);
  const [items, setItems] = useState([
    { name: "", description: "", qty: 1, price: 0 },
  ]);
  const [taxRate, setTaxRate] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);

  const handleChangeClient = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleChangeEntreprise = (e) => {
    const { name, value } = e.target;
    setEntreprise((prevEntrprise) => ({
      ...prevEntrprise,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", description: "", qty: 1, price: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.qty * item.price, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (taxRate / 100);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * (discountRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveInvoice = async () => {
    const invoiceData = {
      client,
      entreprise,
      items,
      taxRate,
      discountRate,
      totalAmount: calculateTotal(),
    };

    try {
      const response = await axios.post("http://localhost:3000/invoice", invoiceData);
      if (response.status === 201) {
        toast.success("Invoice saved successfully!");
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("Failed to save the invoice. Please try again.");
    }
  };
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <header className="flex justify-between items-center pb-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">
            INPT-SUD - Système de Facturation
          </h1>
          <p>Date du jour: {new Date().toLocaleDateString()}</p>
        </header>

        {/* Invoice Form */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Facturer à */}
          <div>
            <h3 className="font-semibold">Facturer à:</h3>
            <input
              type="text"
              name="name"
              placeholder="À qui est destinée cette facture ?"
              className="w-full p-2 border rounded-md mt-2"
              onChange={handleChangeClient}
            />
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              className="w-full p-2 border rounded-md mt-2"
              onChange={handleChangeClient}
            />
            <input
              type="text"
              name="adresse"
              placeholder="Adresse de facturation"
              className="w-full p-2 border rounded-md mt-2"
              onChange={handleChangeClient}
            />
          </div>

          {/* Facturer de */}
          <div>
            <h3 className="font-semibold">Facturer de:</h3>
            <input
              type="text"
              name="name"
              placeholder="De qui provient cette facture ?"
              className="w-full p-2 border rounded-md mt-2"
              onChange={handleChangeEntreprise}
            />
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              className="w-full p-2 border rounded-md mt-2"
              onChange={handleChangeEntreprise}
            />
            <input
              name="adresse"
              type="text"
              placeholder="Adresse de facturation"
              className="w-full p-2 border rounded-md mt-2"
              onChange={handleChangeEntreprise}
            />
          </div>
        </div>

        {/* Articles Section */}
        <div className="mt-6">
          <h3 className="font-semibold">Articles</h3>
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 mt-2 items-center">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Nom de l'article
                </label>
                <input
                  type="text"
                  placeholder="Nom de l'article"
                  className="w-full p-2 border rounded-md"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Description de l'article"
                  className="w-full p-2 border rounded-md"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="w-20">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Quantité
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={item.qty}
                  onChange={(e) =>
                    handleItemChange(index, "qty", e.target.value)
                  }
                />
              </div>
              <div className="w-28">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  prix
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                />
              </div>
              <button
                className="p-2 bg-red-500 text-white rounded-md mt-5"
                onClick={() => handleDeleteItem(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <button
            className="mt-4 p-2 bg-green-500 text-white rounded-md"
            onClick={handleAddItem}
          >
            Ajouter un article
          </button>
        </div>

        {/* Tax and Discount Section */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div>
            <label className="font-semibold">Devise:</label>
            <select className="w-full p-2 border rounded-md">
              <option>MAD (Dirham Marocain)</option>
              <option>USD (US Dollars)</option>
            </select>
          </div>
          <div className="relative">
            <label className="font-semibold">Taux d'impôt (Taxe): (en %)</label>
            <input
              type="number"
              className="w-full p-2 pr-8 border rounded-md"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Taux de réduction: (en %)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="font-semibold">Notes:</label>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            placeholder="Des notes ici"
          ></textarea>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between">
            <span>Sous-total:</span>
            <span>{calculateSubtotal().toFixed(2)} MAD</span>
          </div>
          <div className="flex justify-between">
            <span>Réduction:</span>
            <span>- {calculateDiscount().toFixed(2)} MAD</span>
          </div>
          <div className="flex justify-between">
            <span>Taxe:</span>
            <span>{calculateTax().toFixed(2)} MAD</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{calculateTotal().toFixed(2)} MAD</span>
          </div>
        </div>

        <button
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md"
          onClick={handleOpen}
        >
          Réviser la facture
        </button>
      </div>

      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Facture</DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              {/* Client Info */}
              <div>
                <Typography variant="h6">Facturé à:</Typography>
                <Typography>{client.name}</Typography>
                <Typography>{client.email}</Typography>
                <Typography>{client.adresse}</Typography>
              </div>

              {/* Biller Info */}
              <div>
                <Typography variant="h6">Facturé de:</Typography>
                <Typography>{entreprise.name}</Typography>
                <Typography>{entreprise.email}</Typography>
                <Typography>{entreprise.adresse}</Typography>
              </div>

              {/* Invoice Summary */}
              <div>
                <Typography variant="h6">Date de délivrance:</Typography>
                <Typography>{new Date().toLocaleDateString()}</Typography>
                <Typography variant="h6" style={{ marginTop: "10px" }}>
                  Montant:
                </Typography>
                <Typography>{calculateTotal().toFixed(2)} MAD</Typography>
              </div>
            </div>

            {/* Invoice Table */}
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>QTE</TableCell>
                  <TableCell>DESCRIPTION</TableCell>
                  <TableCell>PRIX</TableCell>
                  <TableCell>MONTANT</TableCell>
                </TableRow>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>
                      {item.name} - {item.description}
                    </TableCell>
                    <TableCell>{item.price} MAD</TableCell>
                    <TableCell>
                      {(item.qty * item.price).toFixed(2)} MAD
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={3}>SOUS-TOTAL</TableCell>
                  <TableCell>{calculateSubtotal().toFixed(2)} MAD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>TAXE</TableCell>
                  <TableCell>{calculateTax().toFixed(2)} MAD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>RÉDUCTION</TableCell>
                  <TableCell>- {calculateDiscount().toFixed(2)} MAD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>TOTAL</TableCell>
                  <TableCell>{calculateTotal().toFixed(2)} MAD</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#03A9F4", color: "white" }}
              >
                Envoyer la facture
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#4CAF50", color: "white" }}
                onClick={handleSaveInvoice}
              >
                Enregistrer la facture
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#f5f5f5", color: "#000" }}
              >
                Télécharger une copie
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <footer className="mt-8 text-center text-gray-500">
        <p>INPT-SUD Système de Facturation</p>
        <p>Développé par Salma EL HAZAL</p>
      </footer>
    </div>
  );
};

export default Invoice;
