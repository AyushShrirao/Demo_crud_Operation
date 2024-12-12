import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const Update = ({ open, onClose, refreshData, selectedItem }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' or 'error'
  });
  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    cost: "",
  });

  // Set initial values when selectedItem changes
  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setQuantity(selectedItem.quantity);
      setCost(selectedItem.cost);
    }
  }, [selectedItem]);

  // Validation function
  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", quantity: "", cost: "" };

    if (!name) {
      newErrors.name = "Product name is required";
      isValid = false;
    }
    if (!quantity) {
      newErrors.quantity = "Quantity is required";
      isValid = false;
    }
    if (!cost) {
      newErrors.cost = "Cost is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validate()) {
      return; // If validation fails, prevent submission
    }

    axios
      .put(
        `https://674ef4f6bb559617b26d6a3f.mockapi.io/api/ayush/Product/${selectedItem.id}`,
        {
          name,
          quantity,
          cost,
        },
        setNotification({
          open: true,
          message: "Item updated successfully!",
          severity: "success",
        })
      )
      .then(() => {
        // setNotification({
        //   open: true,
        //   message: "Item updated successfully!",
        //   severity: "success",
        // });
        refreshData(); // Refresh data after update
        onClose(); // Close the dialog
      })
      .catch(() => {
        setNotification({
          open: true,
          message: "Failed to update item. Please try again.",
          severity: "error",
        });
      });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
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
              error={!!errors.name} // Show error style if there's an error
              helperText={errors.name} // Display the error message below the field
            />
            <TextField
              margin="dense"
              label="Quantity (e.g., '10kg' or '5unit')"
              fullWidth
              variant="outlined"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              error={!!errors.quantity} // Show error style if there's an error
              helperText={errors.quantity} // Display the error message below the field
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
              error={!!errors.cost} // Show error style if there's an error
              helperText={errors.cost} // Display the error message below the field
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Update;
