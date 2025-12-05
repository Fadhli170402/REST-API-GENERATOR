import Mongoose from 'mongoose'

const Schema = new Mongoose.new (
    // Field is Here
    {
        timestamp: { currentTime: () => Math.floor(Date.now() / 1000)},
        // Table Name
    });

Schema.set('toObject', { virtuals: true });
Schema.set('toJSON', { virtuals: true });

export default Mongoose.model("//MODEL NAME", Schema)