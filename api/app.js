const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

const db = require("./models");

// Sync models with the database to ensure schema matches (does not drop tables)
db.sequelize.sync({ alter: true }).then(() => {
    console.log("Database synchronized successfully.");
}).catch(err => {
    console.log("Error synchronizing the database:", err);
});

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

// Import routes for different resources
require("./routes/contacts.routes")(app);
require("./routes/phones.routes")(app);
require("./routes/stats.routes")(app);
require("./routes/company.routes")(app);  // Add your company routes here

// Set port and start listening for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
