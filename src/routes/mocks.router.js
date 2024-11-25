import { Router } from "express";
const router = Router()

import mocksController from "../controllers/mocks.controller.js";


router.get('/mockingpets', mocksController.getMockingPets)
router.get('/mockingusers', mocksController.getMockingUsers)

router.post('/generatedata', mocksController.generateData)

router.get('/pets', mocksController.getDBPets)
router.get('/users', mocksController.getDBUsers)


export default router