const kue = require('kue');
const queue = kue.createQueue();

queue.process('push_notification_code_2', (job, done) => {
  const { phoneNumber, message } = job.data;

  // Simulate sending notification with progress
  let progress = 0;

  const interval = setInterval(() => {
    progress += 20; // Increment progress by 20% each time
    job.progress(progress, 100);  // Update job progress

    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    if (progress >= 100) {
      clearInterval(interval); // Stop the interval when progress reaches 100%
      done();  // Mark the job as complete
    }
  }, 1000);  // Simulate a delay of 1 second for each progress update
});

// Log job completion and failure
queue.on('job complete', (id) => {
  console.log(`Notification job ${id} completed`);
});

queue.on('job failed', (id, errorMessage) => {
  console.log(`Notification job ${id} failed: ${errorMessage}`);
});

