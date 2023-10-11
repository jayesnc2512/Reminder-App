// Schedule medication reminders
import schedule from "node-schedule";
import reminderModel from "../models/reminderModel.js";
import twilio from "twilio";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();


const twilioClient = twilio(process.env.YOUR_TWILIO_ACCOUNT_SID, process.env.YOUR_TWILIO_AUTH_TOKEN);

const sendMedicationReminders = async () => {
    const reminders = await reminderModel.find({})

    reminders.forEach((reminder) => {
        const [hours, minutes] = reminder.time.split(':');
        const reminderTime = new Date();
        reminderTime.setHours(parseInt(hours, 10));
        reminderTime.setMinutes(parseInt(minutes, 10));

        schedule.scheduleJob(reminderTime, () => {
            const message = `Hi ${reminder.name}, it's time to take your medication: ${reminder.title}`;
            const recipients = [reminder.Phone1, reminder.Phone2]
            recipients.forEach((recipient) => {
                if (reminder.isSMS) {
                    twilioClient.messages
                        .create({
                            body: message,
                            from: '+19703294049',
                            to: recipient,
                        })
                        .then(() => {
                            console.log(`Reminder sent to ${reminder.name}`);
                        })
                        .catch((error) => {
                            console.error(`Error sending reminder to ${reminder.name}:`, error);
                        });
                }
                if (reminder.isWhatsapp) {
                    twilioClient.messages
                        .create({
                            body: message,
                            from: 'whatsapp:+14155238886',
                            to: `whatsapp:${recipient}`,
                        })
                        .then(() => {
                            console.log(`Reminder whatsapp to ${reminder.name}`);
                        })
                        .catch((error) => {
                            console.error(`Error sending whatsapp reminder to ${reminder.name}:`, error);
                        });
                }



            })

        });
    });
};

// Schedule the reminder check to run every day at midnight
export default sendMedicationReminders