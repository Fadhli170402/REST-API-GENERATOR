import express from 'express'
// import { checkSchema, param } from 'express-validator'
// import runValidation from '../libraries/runValidation.js';
import InputValidation from '../libraries/InputValidation.js';

import category from '../models/Category.js';

const app = express();

// Store
app.post('/products', 
    await InputValidation.validate({
            categoryId:  {notEmpty: true},
            name: { notEmpty: true},
            status: { notEmpty: true}
        })
)


// Update
app.put('/products/:id', 
    await InputValidation.validate({
            id: { notEmpty: true, in: 'param'},
            categoryId:  {notEmpty: true},
            name: { notEmpty: true},
            status: { notEmpty: true}
        })
)

// Show
// app.get('/categories/:id', 
//     checkSchema ({
//             id: { notEmpty: true, in: 'param'}
//     }), 
//     runValidation
// )

// Delete
// app.delete('/products/:id', 
//     checkSchema ({
//             id: { notEmpty: true, in: 'param'}
//     }), 
//     runValidation
// )
export default app