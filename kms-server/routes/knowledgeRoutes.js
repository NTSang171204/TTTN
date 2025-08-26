// routes/knowledgeRoutes.js
const express = require('express');
const router = express.Router();


// Import tat ca controller
const {
  createKnowledge,
  getAllKnowledge,
  getKnowledgeById,
  updateKnowledge,
  deleteKnowledge,
  searchKnowledge
} = require('../controllers/knowledgeController');

const { authMiddleware } = require('../middlewares/authMiddleware');

// CRUD routes cho knowledge
router.get('/', getAllKnowledge); // Get all knowledge blogs
router.post('/', authMiddleware, createKnowledge); // Create new knowledge blog
router.get('/search', searchKnowledge); // Search knowledge by title or tags
router.delete('/:id', authMiddleware, deleteKnowledge); // Delete knowledge by ID
router.put('/:id', authMiddleware, updateKnowledge); // Update knowledge by ID
router.get('/:id', getKnowledgeById); // Get knowledge by ID
module.exports = router;
