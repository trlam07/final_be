import express from 'express';
import { auth } from "../middlewares/auth.js";
import { login, logout, register } from '../controllers/userController.js';

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

export {router as userRoutes}
