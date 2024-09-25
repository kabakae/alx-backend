import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Event for a successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event for an error during connection
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

