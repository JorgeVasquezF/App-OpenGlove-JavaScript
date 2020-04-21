module.exports = function(io){
	var Glove = require('../gloveAPI/glove');
	var glove = new Glove();
	var serialPort = require("serialport");
	var positivePins = [10,9,6,5,3];
	var negativePins = [15,14,12,8,2];
	var ring = [5]
	var index = [9]
	var middle = [6]
	var thum = [10]
	var pinky = [3]
	var highFinger = ["HIGH"]
	var negativeInit = ["LOW","LOW","LOW","LOW","LOW"];
	var high = ["HIGH","HIGH","HIGH","HIGH","HIGH"];
	glove.openPort("COM4",57600);
	console.log(57600);


	glove.on("open",function(){
	
		console.log("entro");
		io.sockets.on('connection', function(socket) {
			

			glove.initializeMotor(positivePins);
			glove.initializeMotor(negativePins);
			glove.activateMotor(negativePins,negativeInit)
			console.log("Socket connected");

			socket.on('activationData', function(data){
				glove.activateMotor(positivePins,high)
			});
			socket.on('activationRing', function(data){
				glove.activateMotor(ring,highFinger)
			});
			socket.on('activationIndex', function(data){
				glove.activateMotor(index,highFinger)
			});
			socket.on('activationMiddle', function(data){
				glove.activateMotor(middle,highFinger)
			});
			socket.on('activationThum', function(data){
				glove.activateMotor(thum,highFinger)
			});
			socket.on('activationPinky', function(data){
				glove.activateMotor(pinky,highFinger)
			});
		});
		glove.on('data',function(data){

			console.log("llegaron datos");
			console.log(data);
		});

	});

	
	
}