import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const Update = ({ open, onClose, refreshData, selectedItem }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setQuantity(selectedItem.quantity);
      setCost(selectedItem.cost);
    }
  }, [selectedItem]);

  const handleUpdate = () => {
    axios
      .put(
        `https://674ef4f6bb559617b26d6a3f.mockapi.io/api/ayush/Product/${selectedItem.id}`,
        {
          name,
          quantity,
          cost,
        }
      )
      .then(() => {
        refreshData(); // Refresh the list of items
        handleClose(); // Close the popup
      });
  };

  const handleClose = () => {
    onClose(); // Close popup
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Item</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
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
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleUpdate}
          color="primary"
          variant="contained"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Update;
