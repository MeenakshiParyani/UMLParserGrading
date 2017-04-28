 

 module.exports = {
        url : 'mongodb://ec2-54-148-104-133.us-west-2.compute.amazonaws.com:27017/grading',
        options : {
		  db: { native_parser: true },
		  server: { poolSize: 5 }
		}
 }