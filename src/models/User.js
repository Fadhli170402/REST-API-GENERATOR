import Mongoose from 'mongoose'

const Schema = new Mongoose.Schema (
    {
	"fullname":{"type":"String","required":false},
	"email":{"type":"String","required":false},
	"roleId":{"type":Mongoose.Schema.Types.ObjectId,"ref":"Product"},
	"password":{"type":"String","required":false},
	"status":{"type":"Boolean","default":true},
	"createdAt": {"type":"Number"},
	"updatedAt": {"type":"Number"}
},
{
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000)},
        //TABLE_NAME
});

Schema.set('toObject', { virtuals: true });
Schema.set('toJSON', { virtuals: true });

export default Mongoose.model("User", Schema)