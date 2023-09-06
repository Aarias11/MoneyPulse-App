import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Chart from "chart.js/auto"; // Import Chart.js
import UpdateExpenseModal from "../components/Modal";

// Material UI styles
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#279EFF",
            backgroundColor: "", // Set the border color to white
            label: "white",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "white", // Set the input text color to white
        },
      },
    },
  },
});

// Dashboard
function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [totalExpense, setTotalExpense] = useState(0);
  // State to manage the update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

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
      .then((res) => {
        setExpenses(res.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };

  // Handle Expenses Form
  const handleExpenses = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "auth-token": token,
      },
    };

    const expenseData = {
      item,
      amount,
      category,
      date,
      notes,
      description,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/expenses",
        expenseData,
        config
      );

      setItem("");
      setAmount("");
      setCategory("");
      setDate("");
      setNotes("");
      setDescription("");
      fetchExpenses();
    } catch (error) {
      console.error("Expense creation failed", error);
    }
  };

  // Initializing Pie Chart and Calculating Total Expenses
  useEffect(() => {
    initializePieChart();
    calculateTotalExpense();
  }, [expenses]);

  // Pie Chart Config
  const initializePieChart = () => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: getCategories(),
          datasets: [
            {
              data: getCategoryAmounts(),
              backgroundColor: [
                "#96B6C5",
                "#F1C27B",
                "#FFCCCC",
                "#78C1F3",
                "#FEA1A1",
                "#FFF1DC",
                "#E3DFFD",
                "#ECE8DD",
                "#E97777",
                "#BCEAD5",
              ],
            },
          ],
        },
        options: {
          responsive: false,
        },
      });
    }
  };

  // Grouping Expenses by Categories
  const getCategories = () => {
    const uniqueCategories = [
      ...new Set(expenses.map((expense) => expense.category)),
    ];
    return uniqueCategories;
  };

  const getCategoryAmounts = () => {
    const categories = getCategories();
    const categoryAmounts = categories.map((category) =>
      expenses
        .filter((expense) => expense.category === category)
        .reduce((total, expense) => total + parseFloat(expense.amount), 0)
    );
    return categoryAmounts;
  };

  // Calculating Expenses
  const calculateTotalExpense = () => {
    const total = expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.amount),
      0
    );
    setTotalExpense(total.toLocaleString());
  };

  // Handle Delete Expense
  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "auth-token": token,
        },
      };

      // Make the delete request to your API
      await axios.delete(`http://localhost:3001/expenses/${id}`, config);

      // After successful deletion, fetch expenses again to update the list
      fetchExpenses();
    } catch (error) {
      console.error("Expense deletion failed", error);
    }
  };

  // Function to open the update modal
  const openUpdateModal = (expense) => {
    setSelectedExpense(expense);
    setIsUpdateModalOpen(true);
  };

  // Function to close the update modal
  const closeUpdateModal = () => {
    setSelectedExpense(null);
    setIsUpdateModalOpen(false);
  };

  // Function to handle updating an expense
  const handleUpdateExpense = (updatedExpense) => {
    
  };

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Apply the custom theme */}
      <div className="w-full h-auto bg-[#1a1a1a]/90">
        {/* Parent Div */}
        <div className="w-full h-auto text-center xl:w-full xl:h-screen xl:flex">
          {/* Left div */}
          <div className="w-full h-[700px] flex flex-col gap-2 p-4 text-center  xl:flex xl:justify-center xl:flex-col xl:items-center   xl:w-[30%] xl:h-[90%] xl:border-r xl:border-b xl:border-zinc-600">
            <h2 className=" text-center w-full p-4 text-6xl logo text-zinc-300 xl:hidden ">
              Dashboard
            </h2>
            <span className="text-center text-zinc-200 text-2xl p-4 logo">
              Enter Expenses Below
            </span>
            <form
              className="w-full h-full flex flex-col justify-center items-center gap-3 xl:h-full xl:p-6  xl:flex xl:flex-col xl:gap-4  "
              onSubmit={handleExpenses}
            >
              {/* Item Input */}
              <TextField
                className={`w-[420px] opacity-70 xl:w-[290px] ${
                  isUpdateModalOpen ? "text-black" : "text-white"
                }`}
                label="Item"
                size="small"
                value={item}
                sx={{
                  label: { color: isUpdateModalOpen ? "black" : "white" },
                }}
                onChange={(e) => setItem(e.target.value)}
              />
              {/* Amount Input */}
              <TextField
                className={`w-[420px] opacity-70 xl:w-[290px] ${
                  isUpdateModalOpen ? "text-black" : "text-white"
                }`}
                label="Amount"
                type="number"
                size="small"
                value={amount}
                sx={{
                  label: { color: isUpdateModalOpen ? "black" : "white" },
                }}
                onChange={(e) => setAmount(e.target.value)}
              />
              {/* Category Input */}
              <TextField
                className={`w-[420px] opacity-70 xl:w-[290px] ${
                  isUpdateModalOpen ? "text-black" : "text-white"
                }`}
                label="Category"
                size="small"
                value={category}
                sx={{
                  label: { color: isUpdateModalOpen ? "black" : "white" },
                }}
                onChange={(e) => setCategory(e.target.value)}
              />
              {/* Date Input */}
              <TextField
                className={`w-[420px] opacity-70 xl:w-[290px] ${
                  isUpdateModalOpen ? "text-black" : "text-white"
                }`}
                type="date"
                size="small"
                value={date}
                sx={{
                  label: { color: isUpdateModalOpen ? "black" : "white" },
                }}
                onChange={(e) => setDate(e.target.value)}
              />
              {/* Notes Input */}
              <TextField
                className={`w-[420px] opacity-70 xl:w-[290px] ${
                  isUpdateModalOpen ? "text-black" : "text-white"
                }`}
                label="Notes"
                size="small"
                value={notes}
                sx={{
                  label: { color: isUpdateModalOpen ? "black" : "white" },
                }}
                onChange={(e) => setNotes(e.target.value)}
              />
              {/* Description Input */}
              <TextField
                className={`w-[420px] opacity-70 xl:w-[290px] ${
                  isUpdateModalOpen ? "text-black" : "text-white"
                }`}
                label="Description"
                size="small"
                value={description}
                sx={{
                  label: { color: isUpdateModalOpen ? "black" : "white" },
                }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                className="w-[420px]  xl:w-[290px]"
                variant="outlined"
                type="submit"
              >
                Submit Expense
              </Button>
              <br />
              <hr className="text-white w-full" />
              <div className="p-3 text-zinc-200 text-2xl flex flex-col justify-center items-center xl:w-full xl:h-[100%]">
                <span>Total Expense:</span>
                <span>${totalExpense.toLocaleString()}/Mo</span>
              </div>
            </form>
          </div>
          {/* Right Div */}
          <div className="w-[100%] h-[80%] border-none">
            <h2 className="hidden text-center w-full p-4 text-6xl logo text-zinc-300 xl:flex xl:justify-center xl:text-center xl:w-full ">
              Dashboard
            </h2>
            {/* Top Div #2 */}
            <div className="w-[100%] h-[400px] flex justify-center items-center border-t  xl:h-[50%] xl:border-b shadow-md shadow-zinc-500 border-zinc-700 xl:w-full xl:flex xl:justify-center xl:items-center xl:gap-9">
              <canvas ref={chartRef}></canvas>
              <div className="w-[250px] p-4 translate-x-[-30px] xl:w-[300px] text-sm table-data">
                <p className="text-[#BCEAD5] ">
                  ** Items are grouped together by categories and are
                  dynamically visualized in real-time on the interactive chart.
                </p>
                <span className="text-[#96B6C5]">Legend</span>
                <div className="flex xl:flex">
                  <ul className="w-[250px] xl:w-[300px]">
                    <li className="text-[#F1C27B]">Transportation</li>
                    <li className="text-[#FFCCCC]">Food</li>
                    <li className="text-[#78C1F3]">Insurance</li>
                    <li className="text-[#FEA1A1]">Housing</li>
                    <li className="text-[#FFF1DC]">Retirement</li>
                    <li className="text-[#E3DFFD]">Education</li>
                    <li className="text-[#ECE8DD]">Savings</li>
                  </ul>
                  <ul className="w-[300px]">
                    <li className="text-[#78C1F3]">Debt</li>
                    <li className="text-[#F1C27B]">Clothing</li>
                    <li className="text-[#FFCCCC]">Medical/Healthcare</li>
                    <li className="text-[#FEA1A1]">Housing</li>
                    <li className="text-[#ECE8DD]">Miscellaneous</li>
                    <li className="text-[#BCEAD5]">Utilities</li>
                    <li className="text-[#E97777]">Entertainment</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Bottom Div #3 */}
            {/* Right Side Div - Rendered Expenses */}
            <div className="w-[100%] h-[291px] border-t border-b py-5 border-zinc-600 text-zinc-200 text-center overflow-y-scroll">
              <h1 className="text-2xl font-semibold mb-4">Expense List</h1>
              <table className="w-full ">
                <thead className="h-[50px] border sticky top-[-20px] bg-[#1a1a1a]">
                  <tr>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Notes</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="border table-data ">
                  {expenses.map((expense) => (
                    <tr className="border" key={expense._id}>
                      <td>
                        {new Date(expense.date).toISOString().split("T")[0]}
                      </td>
                      <td>{expense.item}</td>
                      <td>${expense.amount}</td>
                      <td>{expense.category}</td>
                      <td>{expense.description}</td>
                      <td>{expense.notes}</td>
                      <td>
                        <button
                          className="bg-teal-700 w-[100px] h-[50px] hover:bg-teal-800"
                          onClick={() => handleDeleteExpense(expense._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-blue-700 w-[100px] h-[50px] hover:bg-blue-800"
                          onClick={() => openUpdateModal(expense)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Render the update modal when it's open */}
                  {isUpdateModalOpen && (
                    <UpdateExpenseModal
                      isOpen={isUpdateModalOpen}
                      onRequestClose={closeUpdateModal}
                      onUpdate={handleUpdateExpense}
                      expense={selectedExpense}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
