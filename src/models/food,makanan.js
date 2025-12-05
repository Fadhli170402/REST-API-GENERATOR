import Mongoose from 'mongoose'

const Schema = new Mongoose.Schema (
    // Field is Here
{
        timestamp: { currentTime: () => Math.floor(Date.now() / 1000)},
        // TABLE_NAME
});

Schema.set('toObject', { virtuals: true });
Schema.set('toJSON', { virtuals: true });

export default Mongoose.model("food,makanan", Schema)