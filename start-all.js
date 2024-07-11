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
  { command: 'npm start --prefix ./mailusage-fe', name: 'mail-usage', prefixColor: 'blue' },
  { command: 'npm start --prefix ./webusage-fe', name: 'web-usage', prefixColor: 'green' },
  { command: 'npm start --prefix ./instanceusage-fe', name: 'instance-usage', prefixColor: 'red' },
  { command: 'npm start --prefix ./disk-usage-fe', name: 'disk-usage-fe', prefixColor: 'yellow' }
]).then(success, failure);

function success() {
  console.log('All applications started successfully.');
}

function failure() {
  console.error('An error occurred while starting the applications.');
}
