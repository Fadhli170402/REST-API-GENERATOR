import express from 'express'
// import { checkSchema, param } from 'express-validator'
import InputValidation from '../libraries/InputValidation.js';

const app = express();

// Store
// app.post('/categories', checkSchema ({
//             name: { notEmpty: true},
//             status: { notEmpty: true}
//     }), 
//     runValidation
// )
app.post('/categories',
    await InputValidation.validate({
        name: { notEmpty: true},
        status: { notEmpty: true}
    })
)


// Update
// app.put('/categories/:id', 
//     checkSchema ({
//             id: { notEmpty: true, in: 'param'},
//             name: { notEmpty: true},
//             status: { notEmpty: true}
//     }), 
//     runValidation
// )

app.put('/categories/:id',
    await InputValidation.validate({
        id: { notEmpty: true, in: 'param'},
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
// app.delete('/categories/:id', 
//     checkSchema ({
//             id: { notEmpty: true, in: 'param'}
//     }), 
//     runValidation
// )
export default app