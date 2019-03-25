const express = require('express');
const bodyParser = require('body-parser');
const DMX = require('dmx');

const dmx = new DMX();
const app = express();
const port = 3000;
const MAXDMX = 20;

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// var universe = dmx.addUniverse('App', 'enttec-open-usb-dmx', '/dev/ttyUSB0')
const universe = dmx.addUniverse('demo', 'null', '');

app.get('/', (req, res) => {
    return res.send('App is working..');
});

app.get('/on', (req, res) => {
  universe.updateAll(255);
  return res.send('App is working..');
});

app.get('/off', (req, res) => {
  universe.updateAll(0);
  return res.send('App is working..');
});

const resetUniverse = dmxValues => {
  for(let i = 0; i < MAXDMX; i+=1) {
    dmxValues[i] = 0;
  }
}

app.post('/update', (req, res) => {
    let dmxValues = {};
    let scenes = req.body['stage'];
    for(let i = 0; i < scenes.length; i++) {
      dmxValues[i + 1] = parseInt(scenes[i]);
    }
    dmx.update('demo', dmxValues);
    res.send('Sent to dmx');
})

app.listen(port, () => console.log(`Listening on port ${port}`));
