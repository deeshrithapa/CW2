const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from client folder
app.use(express.static(path.join("client")));
app.use(bodyParser.urlencoded({ extended: false }));

// PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydb",
  password: "password",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("Database connected successfully");
  }
});

// ==================== USERS ROUTES ====================

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, full_name, email, role FROM users",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.post("/user", async (req, res) => {
  const { full_name, email, password, age, address, phone, role } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (full_name, email, password, age, address, phone, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [full_name, email, password, age, address, phone, role || "student"],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}); 

app.post("/register", async (req, res) => {
  const {
    full_name,  
    email,
    password,
    age,
    address,
    phone,
  } = req.body;

  try {

    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Insert new user
    const result = await pool.query(
      `INSERT INTO users
      (full_name, email, password, age, address, phone)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, full_name, email, role`,
      [
        full_name,
        email,
        password,
        age,
        address,
        phone,
      ]
    );

    res.json({
      success: true,
      message: "Registration successful",
      user: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // User not found
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }

    const user = result.rows[0];

    // Check password
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Login successful
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
// ==================== UNIVERSITIES ROUTES ====================

app.get("/universities", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM universities ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.post("/universities", async (req, res) => {
  const {
    name,
    country,
    city,
    courses,
    tuition,
    description,
    image,
    website,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO universities
      (name, country, city, courses, tuition, description, image, website)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        name,
        country,
        city,
        courses,
        tuition,
        description,
        image,
        website,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.put("/universities/:id", async (req, res) => {
  const { id } = req.params;

  const {
    name,
    country,
    city,
    courses,
    tuition,
    description,
    image,
    website,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE universities
       SET
       name=$1,
       country=$2,
       city=$3,
       courses=$4,
       tuition=$5,
       description=$6,
       image=$7,
       website=$8
       WHERE id=$9
       RETURNING *`,
      [
        name,
        country,
        city,
        courses,
        tuition,
        description,
        image,
        website,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
