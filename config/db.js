 

 module.exports = {
        url : 'mongodb://ec2-34-208-16-251.us-west-2.compute.amazonaws.com:27017/tenants',
        options : {
		  db: { native_parser: true },
		  server: { poolSize: 5 }
		}
 }