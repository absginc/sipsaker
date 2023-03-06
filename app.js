const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());

app.post('/sipsak', (req, res) => {
  const { hostIp, hostPort = '5060' } = req.body;
  const sipsak = spawn('sipsak', ['-O', 'pinger@sipsaker.com', '-s', `sip:${hostIp}:${hostPort}`]);

  let output = '';

  sipsak.stdout.on('data', (data) => {
    output += data.toString();
  });

  sipsak.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  sipsak.on('close', (code) => {
    if (code === 0) {
      console.log('SIP server is available');
      res.status(200).send(`SIP server is AVAILABLE\n${output}`);
    } else {
      console.log('SIP server is not available');
      res.status(502).senid(`SIP server is NOT available\n${output}`);
    }
  });
});

app.listen(3000, () => console.log('sipsaker started on port 3000'));

