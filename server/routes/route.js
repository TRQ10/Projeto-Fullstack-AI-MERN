import { Router } from "express";

const router = Router();

// Import all controllers

import * as controller from '../controllers/appsController.js'
import { registerMail } from "../controllers/mailer.js"
import Auth, { localVariables, isAdmin } from "../middleware/auth.js"



// POST Methods 
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end());
router.route('/login').post(controller.verifyUser,controller.login); 

// GET Methods
router.route('/user').get(controller.getAllUsers)
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

// PUT Methods
router.route('/updateuser').put(Auth, controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);

// DELETE Methods
router.route('/user/:username').delete(isAdmin, controller.deleteUser);

export default router;