const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// In-memory user data store
let users = [];

// Signup route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  users.push({ name, email, password });
  res.status(200).json({ message: 'Signup successful!' });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});