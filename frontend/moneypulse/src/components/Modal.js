import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

// Define the UpdateExpenseModal component
function UpdateExpenseModal({ isOpen, onRequestClose, onUpdate, expense }) {
  // Initialize state for form fields
  const [updatedItem, setUpdatedItem] = useState(expense.item);
  const [updatedAmount, setUpdatedAmount] = useState(expense.amount);
  const [updatedCategory, setUpdatedCategory] = useState(expense.category);
  const [updatedDate, setUpdatedDate] = useState(expense.date);
  const [updatedNotes, setUpdatedNotes] = useState(expense.notes);
  const [updatedDescription, setUpdatedDescription] = useState(
    expense.description
  );
  const [expenses, setExpenses] = useState([]);

  // fetching expenses for re-render and render
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Fetching expenses using Axios
  const fetchExpenses = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/expenses/userexpenses", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {})
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };

  const handleUpdate = async () => {
    // Create an object with the updated data
    const updatedExpense = {
      item: updatedItem,
      amount: updatedAmount,
      category: updatedCategory,
      date: updatedDate,
      notes: updatedNotes,
      description: updatedDescription,
    };

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      // Make a PUT or PATCH request to your API to update the expense
      await axios.put(
        `http://localhost:3001/expenses/${expense._id}`,
        updatedExpense,
        config
      );

      // Call the onUpdate callback function with the updated data
      onUpdate(updatedExpense);
      fetchExpenses();

      // Close the modal
      onRequestClose();
    } catch (error) {
      console.error("Expense update failed", error);
    }
  };

  return (
    <div className="">
      <Modal
        className="bg-black/80 w-full h-screen flex flex-col justify-center items-center relative"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Update Expense Modal"
      >
        <button
          className="font-bold text-5xl text-zinc-300 absolute top-8 right-20 hover:text-blue-600"
          onClick={onRequestClose}
        >
          X
        </button>
        <h2 className="text-white text-2xl p-2">Update Expense</h2>

        <form className="w-[450px] h-[400px] border border-zinc-600 rounded-2xl flex flex-col justify-center items-center gap-3 bg-[#1a1a1a]">
          {/* Item Input */}
          <TextField
            className="xl:w-[290px]"
            label="Item"
            size="small"
            value={updatedItem}
            sx={{
              label: { color: "white" },
            }}
            onChange={(e) => setUpdatedItem(e.target.value)}
          />
          {/* Amount Input */}
          <TextField
            className="xl:w-[290px]"
            label="Amount"
            type="number"
            size="small"
            value={updatedAmount}
            sx={{
              label: { color: "white" },
            }}
            onChange={(e) => setUpdatedAmount(e.target.value)}
          />
          {/* Category Input */}
          <TextField
            className="xl:w-[290px] "
            label="Category"
            size="small"
            value={updatedCategory}
            sx={{
              label: { color: "white" },
            }}
            onChange={(e) => setUpdatedCategory(e.target.value)}
          />
          {/* Date Input */}
          <TextField
            className="xl:w-[290px]"
            type="date"
            size="small"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
          />
          {/* Notes Input */}
          <TextField
            className="xl:w-[290px]"
            label="Notes"
            size="small"
            value={updatedNotes}
            sx={{
              label: { color: "white" },
            }}
            onChange={(e) => setUpdatedNotes(e.target.value)}
          />
          {/* Description Input */}
          <TextField
            className="xl:w-[290px]"
            label="Description"
            size="small"
            value={updatedDescription}
            sx={{
              label: { color: "white" },
            }}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <Button
            className="w-[290px]"
            variant="outlined"
            type="button"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default UpdateExpenseModal;
