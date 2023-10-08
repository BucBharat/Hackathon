const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Parses incoming JSON data
const PORT = 5500;

const base64Credentials = Buffer.from(
  'MAOTHIODFMOWUTZMFLZS:MTEzMjI5Y2EtNTkxOS00ZDBjLWE2YjItNTM3MGYy'
).toString('base64');

let unsentRemindersDummyData = [
  // initial dummy data can stay here
];

app.post('/add-medication', (req, res) => {
  const { name, description, time, phoneNumber } = req.body;

  // Ensure required data is available
  if (!name || !description || !time) {
    return res.status(400).json({ error: 'Required data missing' });
  }
  //   const mediaMessage = mediaUrl
  //     ? `\n\n📸 View related image or media: ${mediaUrl}`
  //     : 'https://ibb.co/H7n9y8h';

  const newReminder = {
    phoneNumber: phoneNumber, // You might want to receive this from the frontend in the future
    message: `Reminder: Time for your medication 🌟\n\nMedication Name: ${name}\nDescription: ${description}\n\nStay healthy and remember to take it on time!`,
    reminderTime: new Date(time),
    isSent: false,
  };

  console.log(newReminder);
  unsentRemindersDummyData.push(newReminder);

  res
    .status(200)
    .json({ message: 'Medication reminder added!', reminder: newReminder });
});

cron.schedule('* * * * * *', async () => {
  console.log('Cron job started!');
  const now = new Date();
  const BUFFER_TIME = 4000; // 60 seconds buffer
  const unsentReminders = unsentRemindersDummyData.filter(reminder => {
    const timeDifference = Math.abs(reminder.reminderTime - now);
    return timeDifference <= BUFFER_TIME && !reminder.isSent;
  });
  //   const unsentReminders = unsentRemindersDummyData.filter(
  //     reminder => reminder.reminderTime <= new Date() && !reminder.isSent
  //   );
  console.log('Current time:', now);

  unsentRemindersDummyData.forEach(reminder => {
    console.log('Reminder data:', reminder);
  });

  console.log(
    'Found ' + unsentRemindersDummyData.length + ' unsent reminders Dummy data.'
  );
  console.log(
    'Found ' + unsentReminders.length + ' unsent reminders after condition.'
  );

  for (const reminder of unsentReminders) {
    console.log('Sending reminder to:', reminder.phoneNumber);

    try {
      const response = await axios.post(
        'https://api.plivo.com/v1/Account/MAOTHIODFMOWUTZMFLZS/Message/',
        {
          src: '1234567890',
          dst: reminder.phoneNumber,
          text: reminder.message,
        },
        {
          headers: {
            Authorization: 'Basic ' + base64Credentials,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 202) {
        reminder.isSent = true;
        console.log('Reminder sent successfully for:', reminder.phoneNumber);
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
