import { Router } from "express";
import publicController from '../controllers/publicController.ts';


const router = Router();

router.get('*', publicController.publicNavigation )

export default router;