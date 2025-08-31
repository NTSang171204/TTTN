// routes/knowledgeRoutes.js
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Import tat ca controller
const {
  fetchAllTechs,
  fetchTechsWithStats
} = require('../controllers/knowledgeController');
const { createTechnology, updateTechnology, deleteTechnology } = require('../controllers/technologyController');


// Cấu hình multer để lưu file vào thư mục /images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images")); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage });


// fetch all techs route
router.get("/", fetchAllTechs); // Fetch all technologies
router.get("/stats", fetchTechsWithStats);
router.post("/", upload.single("icon"),  createTechnology);
router.put("/:id", upload.single("icon"), updateTechnology);
router.delete("/:id", deleteTechnology);


module.exports = router;
