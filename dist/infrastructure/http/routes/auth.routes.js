import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
const router = Router();
router.post('/register', AuthController.register);
router.get('/profile/:id', AuthController.getProfile);
export default router;
//# sourceMappingURL=auth.routes.js.map