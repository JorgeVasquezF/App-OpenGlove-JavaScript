const serialPortLibrary = require("serialport");
var serialPortConstructor = require("serialport").SerialPort;
const Readline = require('@serialport/parser-readline')
var events = require("events");
var util = require('util');


function Communication(portName, baudrate) {
	
	/*this.serialPort = new serialPortConstructor(portName, {
			baudRate: baudrate,
			parser: serialPortLibrary.parsers.readline("\n")
	}, true);*/

	this.sp = new serialPortLibrary(portName, {
        baudRate: baudrate
	});
	this.parser =  this.sp.pipe(new Readline({ delimiter: "\n"}))
	var self = this;
	this.sp.on("open", function () {
		self.emit("open",'');
		self.sp.on('data', function(data){

			self.emit('data', data);

		});
	});

}	

Communication.prototype = new events.EventEmitter;

/*Communication.prototype.openPort = function(portName, baudRate) {
    
	this.serialPort = new serialPortConstructor(portName, {
			baudRate: baudrate,
			parser: serialport.parsers.readline("\n")
	}, true);

}; */

Communication.prototype.getPortNames = function() {
    
	serialPortLibrary.list(function (err, ports) {

		var portNames = [];
		if (!err) {
			ports.forEach(function(port) {
				portNames.push(port.comName);	
			});
		}

		return portNames;			
	});
};

Communication.prototype.write = function(data, callback) {

	var self = this;
	this.sp.write(data);	
};


Communication.prototype.closePort = function() {
	
	this.sp.close();
};

/*Communication.prototype.serialPort.on('data', function(data){

	this.emit('data', data);

});*/

module.exports = Communication;
