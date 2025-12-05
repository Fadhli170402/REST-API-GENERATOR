import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

const env = dotenv.config().parsed

class AuthService {
    // Hash Password
    hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password,salt)

    }

    // Compare Password
    comparePassword = async (password, hashPassword) => {
        return bcrypt.compare(password, hashPassword)
    }


    // Generate JWT Token
    generateToken = async (payload, secretKey, tokenExpiration) => {
        return jwt.sign({ _id: payload._id, fullname: payload.fullname, roleId: payload.roleId}, secretKey,{
            expiresIn: tokenExpiration
            }
        )
    }

    // Verify JWT Token
    verifyToken = async (token, secretKey) =>{
        try {
            return jwt.verify(token, secretKey)
        } catch (error) {
            return error
        }
    }

    // Email Exist
    emailExist = async (email) => {
        if(await User.exists({ email: email }) != null){
            throw new Error('EMAIL_EXIST')
        }
        return true
    }
}

export default new AuthService()