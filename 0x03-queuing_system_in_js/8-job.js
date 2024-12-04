import kue from 'kue';

// Function to create push notification jobs
function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // For each job, create a job in the queue
  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData)
      .save((err) => {
        if (err) {
          console.log('Notification job failed to create:', err);
        } else {
          console.log(`Notification job created: ${job.id}`);
        }
      });

    // Job progress handler
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    // Job completion handler
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // Job failure handler
    job.on('failed', (errorMessage) => {
      console.log(`Notification job ${job.id} failed: ${errorMessage}`);
    });
  });
}

export default createPushNotificationsJobs;

