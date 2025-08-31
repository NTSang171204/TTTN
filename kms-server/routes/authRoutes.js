
const express = require('express');
const { register, login, me, logout, getAllUsers, deleteUser, registerAdmin, loginAdmin } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.get('/me', authMiddleware, me);
router.get('/logout', authMiddleware, logout);
router.get('/users', getAllUsers);
router.delete('/users/:id/', deleteUser);

module.exports = router;