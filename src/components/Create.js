import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const Create = ({ open, onClose, refreshData }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  
  useEffect(() => {
    if (open) {
      setName("");
      setQuantity("");
      setCost("");
    }
  }, [open]);  

 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://674ef4f6bb559617b26d6a3f.mockapi.io/api/ayush/Product", {
        name,
        quantity,
        cost,
      })
      .then(() => {
        refreshData(); 
        onClose();  
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Product"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Quantity"
            fullWidth
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Cost"
            type="number"
            fullWidth
            variant="outlined"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Create;
