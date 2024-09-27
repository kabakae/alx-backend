import redis from 'redis';

// Create Redis client
const client = redis.createClient();

// Handle connection events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);  // Store the value for the schoolName and print confirmation
}

// Function to display the value of a school in Redis
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(`Error fetching data for ${schoolName}: ${err}`);
    } else {
      console.log(reply);  // Log the value from Redis
    }
  });
}

// Call functions as specified
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
