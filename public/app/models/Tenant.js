

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var tenantSchema = new schema({
	tenantName : { type : String },
	username  : { type : String },
	password : { type : String },
    collectionName : { type : String} 
});

module.exports = mongoose.model('tenants', tenantSchema);