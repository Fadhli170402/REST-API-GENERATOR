import { table } from 'console'
import dotenv from 'dotenv'
import fs, { read } from 'fs'
import { json } from 'stream/consumers'

const env = dotenv.config().parsed

class ModuleController {
    systemDir = './src/system'
    modelDir = './src/models'

    updateLoadModel = async (req) => {
        const { model, endpoint } = req.query

        const filename = `${this.modelDir}/LoadModels.js`
        const content = await fs.readFileSync(filename, 'utf-8')

        if(content.includes(`./${model}.js`)){
            throw new Error(`Model ${model} Already Exist`)
        }
        let newContent = content.replace('export default app', '')
        newContent += `import ${model} from './${model}.js'\n`
        newContent += `app.use('/${endpoint}', dynamicController(${model}))\n\n`
        newContent += `export default app`

        await fs.writeFileSync(filename, newContent)

    }

    generateModel = async (req) => {

        const { model, table } = req.query
        const { fields } = req.body
        // Get Template
        const template = `${this.systemDir}/templates/model.js`
        const content = await fs.readFileSync(template, 'utf-8')

        // 
        let fieldsStr = JSON.stringify(fields)
        // console.log(fieldsStr)
        fieldsStr = fieldsStr.replace('{', '{\n\t')
        fieldsStr = fieldsStr.replaceAll('},', '},\n\t')
        fieldsStr = fieldsStr.replaceAll(':,', ':\xa0')
        fieldsStr = fieldsStr.replaceAll('"Mongoose.Schema.Types.ObjectId"', 'Mongoose.Schema.Types.ObjectId')
        fieldsStr = fieldsStr.replaceAll('}}', '},\n\t"createdAt": {"type":"Number"},\n\t"updatedAt": {"type":"Number"}\n},')

        // Change Fields
        let newContent = content.replace('//FIELDS_IS_HERE', fieldsStr)

        // Change Model Name
        newContent = newContent.replace('//MODEL NAME', model)

        if(table){
            newContent = newContent.replace('//TABLE_NAME', `collection: '${table}'`)
        }
        // Model FIleName
        const filename = `${this.modelDir}/${model}.js`

        await fs.writeFileSync(filename, newContent)
        
        return true
    }

    createModule = async (req, res) => {
        try {
            if(!req.query.model) {
                throw new Error('Model_Name_is_Required')
            }else if(!req.query.endpoint){
                throw new Error('Endpoint_is_Required')
            }

            // Panggil Generate Model atau Membuat File
            await this.generateModel(req) //create model
            await this.updateLoadModel(req)//load model & create route

            return res.json({
            status:true,
            message: `Model and Route Created, You Can CRUD`
        })
        } catch (error) {
            return res.json({
                status: false,
                message: error.message
            })
        }
    }
}

export default new ModuleController