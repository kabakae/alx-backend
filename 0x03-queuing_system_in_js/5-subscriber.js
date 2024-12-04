import redis from 'redis';

// Create Redis client
const subscriber = redis.createClient();

subscriber.on('connect', () => {
    console.log('Redis client connected to the server');
});

subscriber.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the channel
subscriber.subscribe('holberton school channel');

// Handle messages from the channel
subscriber.on('message', (channel, message) => {
    console.log(message);

    // Unsubscribe and quit when receiving 'KILL_SERVER'
    if (message === 'KILL_SERVER') {
        subscriber.unsubscribe(channel);
        subscriber.quit();
    }
});

