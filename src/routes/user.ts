import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import User from '../app/modules/entities/User';

const router = Router();

// Get all users
router.get('/', UserController.listAll)
router.get('/:id', UserController.getOneById)
router.post('/', UserController.newUser)
router.put('/:id', [], UserController.editUser);
router.delete('/:id', [], UserController.deleteUser);


export default router;
