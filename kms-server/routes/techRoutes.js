// routes/knowledgeRoutes.js
const express = require('express');
const router = express.Router();


// Import tat ca controller
const {
  fetchAllTechs
} = require('../controllers/knowledgeController');




// fetch all techs route
router.get("/", fetchAllTechs); // Fetch all technologies
module.exports = router;
