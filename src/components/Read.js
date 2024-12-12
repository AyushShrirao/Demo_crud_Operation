
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Create from "./Create";
import Update from "./Update";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

const Read = () => {
  const [data, setData] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", // Can be 'success', 'error', 'info', or 'warning'
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Fetch data from API
  const getData = () => {
    setLoading(true); // Show loader when data fetch starts
    axios
      .get("https://674ef4f6bb559617b26d6a3f.mockapi.io/api/ayush/Product")
      .then((res) => {
        setData(res.data); // Set data directly from the response
        setLoading(false); // Hide loader once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false); // Hide loader if error occurs
      });
  };

  // Delete an item
  const handleDelete = () => {
    if (itemToDelete) {
      axios
        .delete(
          `https://674ef4f6bb559617b26d6a3f.mockapi.io/api/ayush/Product/${itemToDelete.id}`
        )
        .then(() => {
          setData((prevDat) => prevDat.filter((item) => item.id !== itemToDelete.id));
          setNotification({
            open: true,
            message: "Item deleted successfully!",
            severity: "success",
          });
          setOpenDeleteDialog(false); // Close delete confirmation dialog
        })
        .catch((error) => {
          console.error("Error deleting item: ", error);
          setNotification({
            open: true,
            message: "Failed to delete item.",
            severity: "error",
          });
          setOpenDeleteDialog(false); // Close dialog on error
        });
    }
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleOpenUpdate = (item) => {
    setSelectedItem(item);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setSelectedItem(null);
    setOpenUpdate(false);
    getData();
  };

  const handleOpenDeleteDialog = (item) => {
    setItemToDelete(item);
    setOpenDeleteDialog(true); // Open delete confirmation dialog
  };

  const handleCloseDeleteDialog = () => {
    setItemToDelete(null);
    setOpenDeleteDialog(false); // Close delete confirmation dialog
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between m-2">
        <h2>Inventory</h2>
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Create
        </Button>
      </div>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Cost</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eachData) => (
              <tr key={eachData.id}>
                <th scope="row">{eachData.id}</th>
                <td>{eachData.name}</td>
                <td>{eachData.quantity}</td>
                <td>{eachData.cost}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpenUpdate(eachData)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleOpenDeleteDialog(eachData)} // Open delete dialog
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Create Popup */}
      <Create open={openCreate} onClose={handleCloseCreate} refreshData={getData} />

      {/* Update Popup */}
      {selectedItem && (
        <Update
          open={openUpdate}
          onClose={handleCloseUpdate}
          refreshData={getData}
          selectedItem={selectedItem}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" variant="contained">
            Yes
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

export default Read;








 