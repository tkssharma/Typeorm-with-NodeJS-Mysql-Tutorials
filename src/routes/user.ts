import { Router } from 'express';
import UserController from '../app/controllers/UserController';

const router = Router();

// Get all users
router.get('/', [],  UserController.listAll);

export default router;
