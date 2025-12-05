import { validationResult } from "express-validator";

export default (req, res, next) => {
    const result = validationResult(req)

        if(result.isEmpty()){
            next();
        }else {
            res.json({ error: result.array()})
        }
}