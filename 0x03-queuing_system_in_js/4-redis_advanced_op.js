import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Listen for connection success
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Listen for connection errors
client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

// Create and store the hash
const hashKey = 'HolbertonSchools';
client.hset(hashKey, 'Portland', '50', print);
client.hset(hashKey, 'Seattle', '80', print);
client.hset(hashKey, 'New York', '20', print);
client.hset(hashKey, 'Bogota', '20', print);
client.hset(hashKey, 'Cali', '40', print);
client.hset(hashKey, 'Paris', '2', print);

// Display the hash
client.hgetall(hashKey, (err, reply) => {
  if (err) {
    console.error(`Error fetching hash: ${err.message}`);
  } else {
    console.log(reply);
  }
});

