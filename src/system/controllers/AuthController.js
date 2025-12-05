import User from '../../models/User.js';
import AuthService from '../../libraries/AuthService.js';
import dotenv from 'dotenv'
import e from 'express';

const env = dotenv.config().parsed

class AuthController {
    register = async (req, res, next) => {
        try {
            const { fullname, email, password } = req.body

            // Store Data to DB
            const user = await User.create({
                fullname: fullname,
                email: email,
                password: await AuthService.hashPassword(password)
            })

            // Create Token
            const accessToken = await AuthService.generateToken(user, env.JWT_ACCESS_TOKEN_SECRET, env.JWT_ACCESS_TOKEN_LIFE)
            const refreshToken = await AuthService.generateToken(user, env.JWT_REFRESH_TOKEN_SECRET, env.JWT_REFRESH_TOKEN_LIFE)

            return res.json({
                status: true,
                message: 'REGISTER_SUCCESS',
                accessToken,
                refreshToken,
                user: {
                    fullname: user.fullname,
                    email: user.email,
                    password: user.password
                }

            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: 'REGISTER_FAILED',
                error: error.message
            })
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body

            // check Email
            const user = await User.findOne({ email: email})
            if(!user) { throw new Error ('EMAIL_NOT_FOUND') }
            // check Password
            if(!await AuthService.comparePassword(password, user.password)) {
                throw new Error ('PASSWORD_NOT_MATCH')
            }

            // Create Token
            const accessToken = await AuthService.generateToken(user, env.JWT_ACCESS_TOKEN_SECRET, env.JWT_ACCESS_TOKEN_LIFE)
            const refreshToken = await AuthService.generateToken(user, env.JWT_REFRESH_TOKEN_SECRET, env.JWT_REFRESH_TOKEN_LIFE)

            return res.json({
                status: true,
                message: 'LOGIN_SUCCESS',
                accessToken,
                refreshToken,
                user: {
                    fullname: user.fullname,
                    email: user.email
                }

            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: 'LOGIN_FAILED',
                error: error.message
            })
        }
    }

refreshToken = async (req, res, next) => {
        try {
            const { token } = req.params

            // check Token
           const verified = await AuthService.verifyToken(token, env.JWT_REFRESH_TOKEN_SECRET)
            if(verified.message != undefined) { throw new Error(verified.message)}

            // Create Token
            const accessToken = await AuthService.generateToken(verified, env.JWT_ACCESS_TOKEN_SECRET, env.JWT_ACCESS_TOKEN_LIFE)
            const refreshToken = await AuthService.generateToken(verified, env.JWT_REFRESH_TOKEN_SECRET, env.JWT_REFRESH_TOKEN_LIFE)

            return res.json({
                status: true,
                message: 'REFRESH_TOKEN_SUCCES',
                accessToken,
                refreshToken
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: 'REFRESH_TOKEN_FAILED',
                error: error.message
            })
        }
}
}

export default new AuthController()