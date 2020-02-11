const address = '00:18:E4:34:E4:7C' // with name dft-legs
const bluetooth = require('node-bluetooth');
 
// create bluetooth device instance
const device = new bluetooth.DeviceINQ();

device.findSerialPortChannel(address, function(channel){
  console.log('Found RFCOMM channel for serial port on %s: ', 'dft-legs', channel);

  // make bluetooth connect to remote device
  bluetooth.connect(address, channel, function(err, connection){
    if(err) return console.error(err);

    const data0 = "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";
    const data1 = {
	   M1: 100,
	   M2: 250
    };
    const data2 = JSON.stringify(data1);//.split('').map((char)=> char === '"' ? '\"': char).join('');
    console.log('data2', data2);

    const data3 = Buffer.from(data2, 'utf-8');

    console.log('data3',data3)

    connection.write(data3, (all) => {
      console.log("wrote", all);
    });



    connection.on('data', buffer => {
    	console.log('recived message:', buffer.toString(), buffer)
    })
  });

});
