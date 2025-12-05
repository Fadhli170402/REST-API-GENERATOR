import dynamicController from '../routes/DynamicController.js'
import express from 'express'

const app = express()

// Load Model And Create Route

import Category from './Category.js'
app.use('/categories', dynamicController(Category))

import Product from './Product.js';
app.use('/products', dynamicController(Product))

// import user from './user.js';
// app.use('/user', dynamicController(user));

// import food from './food.js';
// app.use('/food', dynamicController(food));

import Specification from './Specification.js'
app.use('/specifications', dynamicController(Specification))

import User from './User.js'
app.use('/users', dynamicController(User))

export default app