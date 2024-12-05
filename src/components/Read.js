
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Create from "./Create";
import Update from "./Update";

const Read = () => {
  const [data, setData] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch data from API
  const getData = () => {
    axios
      .get("https://674ef4f6bb559617b26d6a3f.mockapi.io/api/ayush/Product")
      .then((res) => {
        setData(res.data); // Set data directly from the response
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  // Delete an item
  const handleDelete = (id) => {
    axios
      .delete(
        `https://674ef4f6bb559617b26d6a3f.mockapi.io/api/ayush/Product/${id}`
      )
      .then(() => {
        // Remove the item from the state
        setData((prevDat) => {
          const updatedData = prevDat.filter((item) => item.id !== id);

          // Reassign the IDs based on their new positions
          return updatedData.map((item, index) => ({
            ...item,
            id: index + 1, // Update the ID based on the new index
          }));
        });
      })
      .catch((error) => {
        console.error("Error deleting item: ", error);
      });
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
                  onClick={() => handleDelete(eachData.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </>
  );
};

export default Read;
