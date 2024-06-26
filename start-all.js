const concurrently = require('concurrently');
const { exec } = require('child_process');

/**
 * Start the API using Docker Compose
 */
exec('docker-compose -f ./api/docker-compose.yml up -d', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error starting Docker Compose: ${stderr}`);
    return;
  }
  console.log(`Docker Compose output: ${stdout}`);
});

/**
 * Start all the micro-frontends
 */
concurrently([
  { command: 'npm start --prefix ./receiver', name: 'receiver', prefixColor: 'blue' },
  { command: 'npm start --prefix ./messanger', name: 'messanger', prefixColor: 'green' },
  { command: 'npm start --prefix ./container', name: 'container', prefixColor: 'magenta' }
]).then(success, failure);

function success() {
  console.log('All applications started successfully.');
}

function failure() {
  console.error('An error occurred while starting the applications.');
}
