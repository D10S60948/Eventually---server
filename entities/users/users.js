const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const types = [
	'news',
	'invitation',
	'dateSelection' // invite to select date for event
]

const notification = new Schema(
	{
		event: ObjectId,
		type: { type: String, enum: types },
		receiveTime: { type: Date, default: Date.now }
	}
);

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 200,
			match: [/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/, 'name cannot contains special characters']
		},
		profileImage: String,
		events: [ObjectId],
		friends: [ObjectId],
		inbox: [notification]
	},
	{
		collection: 'Users'
	}
)

userSchema.path('name').validate(name => (name.length > 2) && (name.length < 25), err => console.log(err));

module.exports = mongoose.model('users', userSchema);
