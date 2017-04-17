var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    userName: {
    	unqiue: true,
    	type: String
    },
    password: String,
    sex: Number,
    role: {
    	type: Number,
    	default: 1
    },
    date: {
    	create: { 
    		type: Date, 
    		default: Date.now()
    	},
    	update: {
    		type: Date,
    		default: Date.now()
    	}
    }
});

module.exports = userSchema;
