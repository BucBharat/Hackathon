const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Parses incoming JSON data
const PORT = 5000;

const base64Credentials = Buffer.from(
  'MAOTHIODFMOWUTZMFLZS:MTEzMjI5Y2EtNTkxOS00ZDBjLWE2YjItNTM3MGYy'
).toString('base64');

let unsentRemindersDummyData = [
  // initial dummy data can stay here
];

app.post('/add-medication', (req, res) => {
  const { name, description, time } = req.body;

  // Ensure required data is available
  if (!name || !description || !time) {
    return res.status(400).json({ error: 'Required data missing' });
  }

  const newReminder = {
    phoneNumber: '916303955746', // You might want to receive this from frontend in the future
    message: `It's time to take ${name}. Description: ${description}`,
    reminderTime: new Date(time),
    isSent: false,
  };
  console.log(newReminder);
  unsentRemindersDummyData.push(newReminder);

  res
    .status(200)
    .json({ message: 'Medication reminder added!', reminder: newReminder });
});

cron.schedule('* * * * *', async () => {
  console.log('Cron job started!');

  //   const unsentReminders = unsentRemindersDummyData.filter(
  //     reminder => reminder.reminderTime <= new Date() && !reminder.isSent
  //   );

  console.log(
    'Found ' + unsentRemindersDummyData.length + ' unsent reminders.'
  );

  for (const reminder of unsentRemindersDummyData) {
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
