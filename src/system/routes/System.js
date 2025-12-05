import express from 'express'
import AuthController from "../controllers/AuthController.js"
import ModuleController from "../controllers/ModuleController.js"
import InputValidation from "../../libraries/InputValidation.js"
import AuthService from "../../libraries/AuthService.js"

const router = express.Router()

router.post('/system/modules', ModuleController.createModule)// Generate Model and load Model

// AUTH
router.post('/register', 
            await InputValidation.validate({
                fullname: { notEmpty: true },
                email: { 
                    notEmpty: true,
                    custom: {
                        options: AuthService.emailExist
                    }
                 },
                password: { isLength: { options: {min: 6 }  } }
            }),
            AuthController.register)

    
router.post('/login',
            await InputValidation.validate({
                        email: { notEmpty: true },
                        password: { isLength: { options: { min: 6} } }
                    }), 
                    AuthController.login)

// REFRESH TOKEN
router.post('/refresh-token/:token',
            await InputValidation.validate({
                        refreshToken: { notEmpty: true, in: 'param' }
                    }),
            AuthController.refreshToken)

export default router