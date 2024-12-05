#!/usr/bin/env node

const redis = require('redis');
const { promisify } = require('util');
const kue = require('kue');
const express = require('express');
const app = express();
const queue = kue.createQueue();

// Create Redis client and promisify `get` and `set` methods for async usage
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize variables
let reservationEnabled = true;
const initialSeats = 50;

// Reserve the given number of seats
const reserveSeat = async (number) => {
  await setAsync('available_seats', number);
};

// Get the current number of available seats
const getCurrentAvailableSeats = async () => {
  const seats = await getAsync('available_seats');
  return parseInt(seats, 10);
};

// Initialize Redis with 50 available seats when the application starts
client.on('connect', async () => {
  await reserveSeat(initialSeats);
  console.log('Redis connected and seats initialized');
});

// Route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats.toString() });
});

// Route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat', {}).save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });
});

// Route to process the queue and reserve seats
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  const job = queue.process('reserve_seat', async (job, done) => {
    try {
      const availableSeats = await getCurrentAvailableSeats();

      // If there are no available seats, block further reservations
      if (availableSeats <= 0) {
        reservationEnabled = false;
        return done(new Error('Not enough seats available'));
      }

      // Decrease the number of available seats by 1
      const newAvailableSeats = availableSeats - 1;
      await reserveSeat(newAvailableSeats);

      console.log(`Seat reservation job ${job.id} completed`);

      // If no seats are available, disable further reservations
      if (newAvailableSeats === 0) {
        reservationEnabled = false;
      }

      done();
    } catch (error) {
      console.log(`Seat reservation job ${job.id} failed: ${error.message}`);
      done(error);
    }
  });
});

// Start the Express server on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

