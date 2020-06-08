#!/usr/bin/env node

var gamepad = require('gamepad');

gamepad.init();

setInterval(gamepad.processEvents, 16);

const onGamepad = (id, axis, value) => {
    console.log('id:', id, ' axis:', axis, ' value:', value);
};

gamepad.on('move', onGamepad);
