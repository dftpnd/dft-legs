const address = '00:18:E4:34:E4:7C' // with name dft-legs
const bluetooth = require('node-bluetooth');
 
// create bluetooth device instance
const device = new bluetooth.DeviceINQ();

device.findSerialPortChannel(address, function(channel){
  console.log('Found RFCOMM channel for serial port on %s: ', 'dft-legs', channel);

  // make bluetooth connect to remote device
  bluetooth.connect(address, channel, function(err, connection){
    if(err) return console.error(err);
	
    const data = ['a', 'b'];
    const data2 = JSON.stringify(data);
    const data3 = new Buffer(data2, 'utf-8');

    connection.write(data3, (all) => {
      console.log("wrote", all);
    });
  });

});
