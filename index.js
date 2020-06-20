const address = '00:18:E4:34:E4:7C'; // 18:e4:34e47c
const bluetooth = require('node-bluetooth');
const device = new bluetooth.DeviceINQ();
const gamepad = require('gamepad');

gamepad.init();
setInterval(gamepad.processEvents, 16);

const buttonsMap = {
    leftTrigger: 32,
    rightTrigger: 33,
};

const motorAdapt = (val) => Math.round(((val * 50 + 50) * 255) / 100);

device.findSerialPortChannel(address, function (channel) {
    console.log(
        'Found RFCOMM channel for serial port on %s: ',
        'dft-legs',
        channel
    );

    // make bluetooth connect to remote device
    bluetooth.connect(address, channel, function (err, connection) {
        if (err) return console.error(err);

        const data1 = {
            M1: 0,
            M2: 0,
            servo: 0,
        };

        gamepad.on('move', (id, axis, value) => {
            if (axis === buttonsMap.rightTrigger) {
                data1.M1 = motorAdapt(value);
            }

            if (axis === buttonsMap.leftTrigger) {
                data1.M2 = motorAdapt(value);
            }

            const pureData = Buffer.from(JSON.stringify(data1), 'utf-8');

            connection.write(pureData, (all) => {
                console.log('done', data1);
            });
        });

        connection.on('data', (buffer) => {
            console.log('recived message:', buffer.toString(), buffer);
        });
    });
});
