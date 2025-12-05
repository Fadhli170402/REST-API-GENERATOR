import express from 'express'
import DynamicController from '../controllers/DynamicController.js'
// import { model } from 'mongoose'


const dynamicCrud = (model) => {
    const router = express.Router()
    const dynamicController = new DynamicController(model);

    router.get('/', dynamicController.index)// all rows
    router.get('/:id', dynamicController.show)// single row (nampilin detail)
    router.post('/', dynamicController.store)// Simpan data
    router.put('/:id', dynamicController.update)// Update Data  
    router.delete('/:id', dynamicController.delete)// Delete data

    return router
}

export default dynamicCrud