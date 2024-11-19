const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mock Data
let users = [
  {
    userId: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    companyId: 101,
    role: "Manager",
    points: 1000,
  },
  {
    userId: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    phone: "0987654321",
    companyId: 102,
    role: "CEO",
    points: 2000,
  },
];

let paymentCredentials = [
  {
    userId: 1,
    accountNumber: "1234-5678-9012-3456",
    cvv: "123",
    expiry: "12/25",
    accountType: "Visa",
    address: "123 Main St",
  },
  {
    userId: 2,
    accountNumber: "5678-9012-3456-7890",
    cvv: "456",
    expiry: "06/26",
    accountType: "MasterCard",
    address: "456 Elm St",
  },
];

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the User Management API!",
    endpoints: {
      getUser: "/api/user/:userId",
      updateUser: "/api/user/:userId",
      createUser: "/api/user",
      deleteUser: "/api/user/:userId",
      getPayment: "/api/user/:userId/payment",
      updatePayment: "/api/user/:userId/payment",
      createPayment: "/api/user/:userId/payment",
      deletePayment: "/api/user/:userId/payment",
    },
  });
});

//
// CRUD for User Profiles
//

// Get user by ID
app.get("/api/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.userId === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// Create a new user
app.post("/api/user", (req, res) => {
  const { firstName, lastName, email, phone, companyId, role, points } =
    req.body;
  const newUser = {
    userId: users.length + 1,
    firstName,
    lastName,
    email,
    phone,
    companyId,
    role,
    points,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user details
app.put("/api/user/:userId/contact", (req, res) => {
  const userId = parseInt(req.params.userId);
  const { email, phone_number } = req.body;
  const user = users.find((u) => u.userId === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.email = email || user.email;
  user.phone_number = phone_number || user.phone_number;
  res.json(user);
});

// Delete a user
app.delete("/api/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIndex = users.findIndex((u) => u.userId === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const deletedUser = users.splice(userIndex, 1);
  res.json({ message: "User deleted successfully", user: deletedUser[0] });
});

//
// CRUD for Payment Credentials
//

// Get payment credentials for a user
app.get("/api/user/:userId/payment", (req, res) => {
  const userId = parseInt(req.params.userId);
  const payment = paymentCredentials.find((p) => p.userId === userId);
  if (!payment) {
    return res.status(404).json({ error: "Payment credentials not found" });
  }
  res.json(payment);
});

// Create payment credentials
app.post("/api/user/:userId/payment", (req, res) => {
  const userId = parseInt(req.params.userId);
  const { accountNumber, cvv, expiry, accountType, address } = req.body;
  const newPayment = {
    userId,
    accountNumber,
    cvv,
    expiry,
    accountType,
    address,
  };
  paymentCredentials.push(newPayment);
  res.status(201).json(newPayment);
});

// Update payment credentials
app.put("/api/user/:userId/payment", (req, res) => {
  const userId = parseInt(req.params.userId);
  const { card_number, cvv, expiration_date, provider, address } = req.body;
  const payment = paymentCredentials.find((p) => p.userId === userId);
  if (!payment) {
    return res.status(404).json({ error: "Payment credentials not found" });
  }
  payment.card_number = card_number || payment.card_number;
  payment.cvv = cvv || payment.cvv;
  payment.expiration_date = expiration_date || payment.expiration_date;
  payment.provider = provider || payment.provider;
  payment.address = address || payment.address;
  res.json(payment);
});

// Delete payment credentials
app.delete("/api/user/:userId/payment", (req, res) => {
  const userId = parseInt(req.params.userId);
  const paymentIndex = paymentCredentials.findIndex((p) => p.userId === userId);
  if (paymentIndex === -1) {
    return res.status(404).json({ error: "Payment credentials not found" });
  }
  const deletedPayment = paymentCredentials.splice(paymentIndex, 1);
  res.json({
    message: "Payment credentials deleted successfully",
    payment: deletedPayment[0],
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
