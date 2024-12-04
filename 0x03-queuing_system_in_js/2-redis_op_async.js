import { createClient, print } from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = createClient();

// Promisify the `get` method
const getAsync = promisify(client.get).bind(client);

// Listen for connection success
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Listen for connection errors
client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

/**
 * Set a new value in Redis
 * @param {string} schoolName - The key
 * @param {string} value - The value
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print); // Use redis.print to display confirmation
}

/**
 * Display the value of a key in Redis (using async/await)
 * @param {string} schoolName - The key
 */
async function displaySchoolValue(schoolName) {
  try {
    const result = await getAsync(schoolName);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// Call the functions as required
(async () => {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
})();

