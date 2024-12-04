const kue = require('kue');
const queue = kue.createQueue();

queue.process('push_notification_code_3', (job, done) => {
  console.log(`Processing job ${job.id} with message: ${job.data.message}`);

  // Simulate job processing with progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    job.progress(progress);
    console.log(`Notification job ${job.id} ${progress}% complete`);

    if (progress === 100) {
      clearInterval(interval);
      console.log(`Notification job ${job.id} completed`);
      done();
    }
  }, 1000);

  // Simulate a random failure
  if (Math.random() < 0.1) {
    clearInterval(interval);
    job.failed(new Error('Random failure occurred'));
    console.log(`Notification job ${job.id} failed: Random failure occurred`);
  }
});

