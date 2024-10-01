module.exports = app => {
    const companies = require("../controllers/companies.controller.js");

    var router = require("express").Router();

    // Create a new Company
    router.post("/companies", companies.create);

    // Retrieve all Companies
    router.get("/companies", companies.findAll);

    // Update a Company by ID
    router.put("/companies/:company_id", companies.update);

    // Delete a Company by ID
    router.delete("/companies/:company_id", companies.delete);

    app.use('/api', router);  // Ensure the route prefix is '/api'
};
