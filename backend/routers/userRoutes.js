import express from "express";
import { getUser, updateUser,deleteUser,addUser} from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', getUser);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;