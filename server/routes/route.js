import { Router } from "express";

const router = Router();

// Import all controllers

import * as controller from '../controllers/appsController.js'



// POST Methods 
router.route('/register').post(controller.register);

// router.route('/').post(controller.re);
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end());

router.route('/login').post(controller.verifyUser,controller.login); 


// GET Methods
router.route('/user/:username').get(controller.getUser)
router.route('/geberateOTP').get(controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

// PUT Methods
router.route('/updateuser').put(controller.updateUser);
router.route('/resetPassword').put(controller.resetPassword);

export default router;