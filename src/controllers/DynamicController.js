class DynamicController{
    _model;

    // buat cosntrutor model agar bisa diakses dimanapun
    constructor(model){
        this._model = model
    }

    // JOIN TABLE
    join = async (req) => {
        if(!req.query.join){
            return
        }

        const { join } = req.query

        let output = []

        const joins = join.split('|')
        // console.log(joins)
        joins.forEach(join => {
            const result = join.split(':')
            // const table = result[0]
            // const columns = result[1]
            // output.push({ path: table, select: columns})
            output.push({ path: result[0], select: result[1]})
        });
        // Pada Mongose join table menggunakan populate
        return output
    }

    // membuat fuction index untuk menampilkan seluruh data mis user dll
    index = async (req, res) => {
        try {
            // const data = await this._model.find().populate(this.join(req));
            const data = await this._model.find().populate(await this.join(req));
            return res.json({
                status: true,
                message: 'Data Found',
                total: data.length,
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }

    // Create Data
    store = async (req, res) => {
        try {
            const data = await this._model.create(req.body);
            if(!data) {throw { message: 'Failed Store Data'}}

            return res.json({
                status: true,
                message: 'Succes Store Data',
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }

    // Update Data
    update = async (req, res) => {
        try {
            const data = await this._model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true});
            if(!data) {throw { message: 'Failed Update Data'}}

            return res.json({
                status: true,
                message: 'Success Update Data',
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }

    // Show Data
    show = async (req, res) => {
        try {
            const data = await this._model.findOne({ _id: req.params.id });
            if(!data) {throw { message: 'Data Not Found'}}

            return res.json({
                status: true,
                message: 'Data Found',
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }


    // Delete data
    delete = async (req, res) => {
        try {
            const data = await this._model.findOneAndDelete({ _id: req.params.id });
            if(!data) {throw { message: 'Failed Delete Data'}}

            return res.json({
                status: true,
                message: 'Succes Delete Data',
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }
}

export default DynamicController