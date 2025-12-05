import { checkSchema, validationResult } from "express-validator";


class InputValidation {
    validate = async (schema) => {
        return [
            checkSchema(schema),
            (req, res, next) => {
                try {
                    const result = validationResult(req)

                    if(!result.isEmpty()){
                        throw { message: result.array() }
                    }

                    next();
                } catch (error) {
                    return res.status(400).json({
                        status: false,
                        message: 'INPUT ERROR',
                        error: error.message
                    })
                }
            }
        ]
    }
}

export default new InputValidation