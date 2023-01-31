import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { verifyToken, adminOnly } from '../middleware/authUser.js';

const router = express.Router();

router
  .get('/users', getUsers)
  .get('/users/:id', getUserById)
  .post('/users', createUser)
  .put('/users/:id', verifyToken, updateUser)
  .delete('/users/:id', verifyToken, adminOnly, deleteUser);

export default router;
