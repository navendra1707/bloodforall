import express from 'express'
import { findDonors, getAllUsers, getDonatedUsers, login, register, updateUser } from '../controllers/user.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/get-donors', findDonors);

router.get('/last-donated', getDonatedUsers);
router.get('/get-all-users', getAllUsers);

router.put('/update-user', updateUser);

export default router;